var MAIN_CONTAINER = "iframe_main";
var DIV_INFO = "<dl><dt>You can add:</dt><dd>- Paragraph</dd><dd>- Button</dd><dd>- Something</dd><dt>You can change:</dt><dd>- Color</dd><dd>- Font size</dd></dl>";
var P_INFO = "<dl><dt>You can add:</dt><dd>- Image</dd><dd>- Links</dd><dt>You can change:</dt><dd>- Text color</dd><dd>- Font size</dd></dl>";

var $frame = null;
var $targetContainer = null;
var $popOver = null;
var targetContainerId = MAIN_CONTAINER;

$('document').ready(function() {

    // initialize popover
    $popOver = $("#help").popover({html: "true", content: DIV_INFO});
    // find frame
    $frame = $('iframe#main');

    $('.mic').on("click", function() {
        $(".fa-microphone").toggleClass("blue");
        $("input[name='speech']").focus();
    });

    $("#download").on("click", function() {
        $('iframe#main').attr('src', $('iframe#main').attr('src'));
    });

    // handle clicks on iframe elements
    $frame.on("load", function() {
        $targetContainer = $frame.contents().find("#"+(targetContainerId || MAIN_CONTAINER));
        $($frame.contents().get(0)).on("click", function(e) {
            $clicked = $(e.target);
            if ($targetContainer && !$clicked.is("html") && !$clicked.is("ul")) {
                $targetContainer.css("outline", "none");
                $targetContainer = $clicked;
                targetContainerId = $targetContainer.prop("id");
                $targetContainer.css({"outline": "2px dashed rgb(87, 176, 219)"});
                $("#target").html($targetContainer.prop("tagName"))
            }
            updatePopOver();
        });
        $targetContainer.click();
    });

    $frame.one("load", function() {
        $frame.on("load", function() {
            $frame.contents().scrollTop($frame.contents().height());
            $frame.animate({
                opacity: 100
            }, 4500);
        });

    });

    $("a[name='remove']").bind('click', function() {
        sendQuery('delete', '', targetContainerId, {});
    });

    $("button[name='addJT']").bind('click', function() {
        var text = $("input[name='addJT']").val();
        if (!text)
            return errStatus("No text provided");
        sendQuery('add', 'jumbotron', targetContainerId, {"text": text});
    });

    $("button[name='addParagraph']").bind('click', function() {
        var text = $("textarea[name='paragraph']").val();
        if (!text)
            return errStatus("No text provided");
        sendQuery('add', 'paragraph', targetContainerId, {"text": text});
    });

    $("button[name='addH1']").bind('click', function() {
        var text = $("input[name='addH1']").val();
        if (!text)
            return errStatus("No text provided");
        sendQuery('add', 'h1', targetContainerId, {"text": text});
    });

    $("button[name='addH2']").bind('click', function() {
        var text = $("input[name='addH2']").val();
        if (!text)
            return errStatus("No text provided");
        sendQuery('add', 'h2', targetContainerId, {"text": text});
    });

    $("button[name='addH3']").bind('click', function() {
        var text = $("input[name='addH3']").val();
        if (!text)
            return errStatus("No text provided");
        sendQuery('add', 'h3', targetContainerId, {"text": text});
    });

    $("button[name='addButton']").bind('click', function() {
        sendQuery('add', 'button', targetContainerId, {});
    });

    $("button[name='addImage']").bind('click', function() {
        attr = {
            "link": $("input[name='addImage']").val(),
            "height": $("input[name='imWidth']").val(),
            "width": $("input[name='imHeight']").val(),
        }
        if (attr.link.length === 0)
            return errStatus('No link provided');
        sendQuery('add', 'image', targetContainerId, attr);
    });
});

function sendQuery(action, element, target, options) {
    $frame.stop(true).css("opacity", "0");
    // send a query to the server
    $.ajax({
        url: "editor/query",
        type: "POST",
        // payload as a string
        data: JSON.stringify({"element": element, "target": target, "action": action, "options": options}),
        contentType: "application/json; charset=utf-8",
        // expected type of reply
        dataType: "json",
        success: function(response) {
            $frame.attr('src', $frame.attr('src'));
            if (response.status === 'ok') {
                // reload iframe
                $frame.attr('src', $frame.attr('src'));
                console.log(response.message);
            }
            else {
                // server couldn't handle request
                console.log(response.message);
            }
        },
    });
}

function deleteQuery(target) {
    $frame.stop(true).css("opacity", "0");
    // send a query to the server
    $.ajax({
        url: "editor/query",
        type: "DELETE",
        // payload as a string
        data: JSON.stringify({"target": target}),
        contentType: "application/json; charset=utf-8",
        // expected type of reply
        dataType: "json",
        success: function(response) {
            $frame.attr('src', $frame.attr('src'));
            if (response.status === 'ok') {
                // reload iframe
                $frame.attr('src', $frame.attr('src'));
                console.log(response.message);
            }
            else {
                // server couldn't handle request
                console.log(response.message);
            }
        },
    });
}

function updatePopOver() {
    switch($targetContainer.prop("tagName")) {
        case "DIV":
        $popOver.attr("data-content", DIV_INFO);
        // $popOver.data('bs.popover').tip().find(".popover-content").html(DIV_INFO);
        break;

        case "P":
        break;

        default:
        $popOver.attr("data-content", "Nothing");

    }
}

function okStatus(message) {
    $('span.status').html(message);
    $('span.dstatus').css('color', 'rgb(104, 148, 60)');
}

function errStatus(message) {
    $('span.status').html(message);
    $('span.dstatus').css('color', 'rgb(172, 58, 58)');
}
