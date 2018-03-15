const fs = require("fs");
const https = require("https");
const imageUrls = JSON.parse(fs.readFileSync("images.json"));
const baseUrl = "https://static.wixstatic.com/";

imageUrls.map(relUrl => {
    let fileName = relUrl.split("/")[1];
    fetchImage(relUrl, fileName);
});

function fetchImage(relUrl, fileName) {
    if (fs.existsSync(fileName)) {
        console.log(`File already exists.. skipping: ${fileName}`);
        return;
    }

    https
        .get(`${baseUrl}${relUrl}`, resp => {
            let data = "";
            resp.setEncoding("binary");

            // A chunk of data has been recieved.
            resp.on("data", chunk => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on("end", () => {
                fs.writeFile(fileName, data, "binary", e => {
                    if (e) throw e;
                    console.log(`Saved ${fileName}`);
                });
            });
        })
        .on("error", e => {
            console.log("Error: " + e.message);
        });
}
