// Snippet to get array of all urls to images on WIX:

$("entities-grid li.item").each(function(index, element) {
    var $el = $(element);
    if ($el) {
        console.log($(element).attr("item-url"));
    }
});
