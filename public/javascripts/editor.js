var btnCounter = 1;
var currentContainer;

$('document').ready(function() {

    $('iframe#main').load(function() {
        currentContainer = $('iframe#main').contents().find('body');
    });


    $("a[name='remove']").bind('click', function() {
        var last = currentContainer.children().last();
        if (!last.length)
            return removeElement(last, "no elements");
        removeElement(last);
    });

    $("button[name='addJT']").bind('click', function() {
        var text = $("input[name='addJT']").val();
        if (text.length === 0)
            return addElement(null, 'No text provided');
        addElement($('<div>').addClass('jumbotron')
                                .append($('<h2>').html(text)));
    });

    $("button[name='addParagraph']").bind('click', function() {
        var text = $("textarea[name='paragraph']").val();
        if (text.length === 0)
            return addElement(null, 'No text provided');
        addElement($('<p>').html(text));
    });

    $("button[name='addH1']").bind('click', function() {
        var text = $("input[name='addH1']").val();
        if (text.length === 0)
            return addElement(null, 'No text provided');
        addElement($('<h1>').html(text));
    });

    $("button[name='addH2']").bind('click', function() {
        var text = $("input[name='addH2']").val();
        if (text.length === 0)
            return addElement(null, 'No text provided');
        addElement($('<h2>').html(text));
    });

    $("button[name='addH3']").bind('click', function() {
        var text = $("input[name='addH3']").val();
        if (text.length === 0)
            return addElement(null, 'No text provided');
        addElement($('<h3>').html(text));
    });

    $("button[name='addButton']").bind('click', function() {
        addElement($('<button>').html('Button' + btnCounter.toString()));
        btnCounter += 1;
    });

    $("button[name='addImage']").bind('click', function() {
        link = $("input[name='addImage']").val();
        if (link.length === 0)
            return addElement(null, 'No link provided');
        height = $("input[name='imWidth']").val();
        width = $("input[name='imHeight']").val();
        img = $('<img>').attr('src', link);
        if (height && width) {
            img.attr('height', height);
            img.attr('width', width);
        }
        addElement(img);
    });
});

function addElement(element, error) {
    if (typeof error !== "undefined")
        return updateStatus(1, error);
    currentContainer.append(element);
    updateStatus(0, 'element added');

}

function removeElement(element, error) {
    if (typeof error !== "undefined")
        return updateStatus(1, error);
    element.remove();
    updateStatus(0, "element deleted");
}

function updateStatus(code, message) {
    if (code === 1) {
        $('span.status').html(message);
        $('span.dstatus').css('color', 'rgb(172, 58, 58)');
        return;
    }
    $('span.status').html(message);
    $('span.dstatus').css('color', 'rgb(104, 148, 60)');
}
