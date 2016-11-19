var MAIN_CONTAINER = "iframe_main";
var DIV_INFO = "<dl><dt>You can add:</dt><dd>- Paragraph</dd><dd>- Button</dd><dd>- Something</dd><dt>You can change:</dt><dd>- Color</dd><dd>- Font size</dd></dl>";
var P_INFO = "<dl><dt>You can add:</dt><dd>- Image</dd><dd>- Links</dd><dt>You can change:</dt><dd>- Text color</dd><dd>- Font size</dd></dl>";

var $frame = null;
var $target = null;
var $popOver = null;
var targetId = MAIN_CONTAINER;
var topOffset = 0;
var addedElement;

$('document').ready(function() {

    // initialize popover
    $popOver = $("#help").popover({html: "true"});
    // grab iframe
    $frame = $('iframe#main');

    $('.mic').on("click", function() {
        $(".fa-microphone").toggleClass("blue");
        $("input[name='speech']").focus();
    });

    // handle clicks on iframe elements
    $frame.on("load", function() {
        // get target element in iframe by id
        $target = $frame.contents().find("#"+(targetId || MAIN_CONTAINER));
        // bind click event to iframe elements
        $($frame.contents().get(0)).on("click", function(e) {
            $clicked = $(e.target);
            // filter clicked element
            if (!$target || $clicked.is("body") || $clicked.is("html") || $clicked.is("ul")) {
                return;
            }
            $target.css("outline", "none");
            $target = $clicked;
            targetId = $target.prop("id");
            $target.css({"outline": "2px dashed rgb(87, 176, 219)"});
            $("#target").html($target.prop("tagName"))
            // update help popover according to a clicked element
            updatePopOver();
        });
        // "click" an element after iframe has been refreshed
        $target.click();
        // if new element added, find its offset
        if (addedElement) {
            $addElement = $frame.contents().find("#"+addedElement);
            topOffset = $addElement.offset().top + $addElement.innerHeight()/2 - $(window).height()/2;
            addedElement = undefined;
        }
        // scroll to previous position or to newly added element
        $frame.contents().scrollTop(topOffset);
        $frame.animate({opacity: 100}, 4500);
    });


    // $("button[name='addImage']").bind('click', function() {
    //     attr = {
    //         "link": $("input[name='addImage']").val(),
    //         "height": $("input[name='imWidth']").val(),
    //         "width": $("input[name='imHeight']").val(),
    //     }
    //     if (attr.link.length === 0)
    //         return errStatus('No link provided');
    //     sendQuery('add', 'image', targetId, attr);
    // });
});

/*
    Sends query to the server:
    action: "add", "change", "set"
    element: one of the established elements, e.g. "jumbotron", "paragraph" etc.
    target: id of the selected element
    options: a js object that contains additional information, e.g. text, modifier etc.
*/
function sendQuery(action, element, target, options) {
    topOffset = $frame.contents().find("body").scrollTop();
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
                addedElement = response.id;
                // reload iframe
                $frame.attr('src', $frame.attr('src'));
            }
            else {
                // server couldn't handle request
            }
            console.log(response.message);
        },
    });
}

/*
    Sends delete query to the server.
    target: id of an element to delete, normally its targetId
*/

function deleteQuery(target) {
    topOffset = $frame.contents().find("body").scrollTop();
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
            }
            else {
                // server couldn't handle request
            }
            console.log(response.message);
        },
    });
}

// updates help popover
function updatePopOver() {
    switch($target.prop("tagName")) {
        case "DIV":
        $popOver.attr("data-content", DIV_INFO);
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
