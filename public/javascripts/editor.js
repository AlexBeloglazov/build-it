var MAIN_CONTAINER = "iframe_main";
var MAIN_INFO = "<dl> <dt>You can add:</dt> <dd>&bull; Navigational bar</dd> <dd>&bull; Side panel <dl> <dd>- to left</dd> <dd>- to right</dd> </dl> </dd> <dd>&bull; Header <dl> <dd>- large</dd> <dd>- medium</dd> <dd>- small</dd> <dd>- extra small</dd> </dl> </dd> <dd>&bull; Paragraph</dd> <dd>&bull; Jumbotron</dd> <dd>&bull; Image</dd> <dd>&bull; Link</dd> <dd>&bull; Button <dl> <dd>- large</dd> <dd>- small</dd> <dd>- extra small</dd> </dl> </dd> <dd>&bull; Footer</dd> <dt>You can change:</dt> <dd>&bull; Background color <dl> <dd>- blue</dd> <dd>- green</dd> <dd>- red</dd> <dd>- orange</dd> <dd>- white</dd> </dl> </dd> <dt>You can delete it</dt> </dl>";
var H1_INFO = "<dl> <dt>You can change:</dt> <dd>&bull; Size <dl> <dd>- medium</dd> <dd>- small</dd> <dd>- extra small</dd> </dl> </dd> <dd>&bull; Alignment <dl> <dd>- left</dd> <dd>- center</dd> <dd>- right</dd> </dl> </dd> <dt>You can delete it</dt> </dl>";
var H2_INFO = "<dl> <dt>You can change:</dt> <dd>&bull; Size <dl> <dd>- large</dd> <dd>- small</dd> <dd>- extra small</dd> </dl> </dd> <dd>&bull; Alignment <dl> <dd>- left</dd> <dd>- center</dd> <dd>- right</dd> </dl> </dd> <dt>You can delete it</dt> </dl>";
var H3_INFO = "<dl> <dt>You can change:</dt> <dd>&bull; Size <dl> <dd>- large</dd> <dd>- medium</dd> <dd>- extra small</dd> </dl> </dd> <dd>&bull; Alignment <dl> <dd>- left</dd> <dd>- center</dd> <dd>- right</dd> </dl> </dd> <dt>You can delete it</dt> </dl>";
var H4_INFO = "<dl> <dt>You can change:</dt> <dd>&bull; Size <dl> <dd>- large</dd> <dd>- medium</dd> <dd>- small</dd> </dl> </dd> <dd>&bull; Alignment <dl> <dd>- left</dd> <dd>- center</dd> <dd>- right</dd> </dl> </dd> <dt>You can delete it</dt> </dl>";
var A_INFO = "<dl> <dt>You can change:</dt> <dd>&bull; Size <dl> <dd>- large</dd> <dd>- medium</dd> <dd>- small</dd> </dl> </dd> <dt>You can delete it</dt> </dl>";
var BUTTON_INFO = "<dl> <dt>You can change:</dt> <dd>&bull; Size <dl> <dd>- large</dd> <dd>- standard</dd> <dd>- small</dd> </dl> </dd> <dd>&bull; Color <dl> <dd>- blue</dd> <dd>- green</dd> <dd>- red</dd> <dd>- orange</dd> <dd>- white</dd> </dl> </dd> </dl>";
var LI_INFO = "<dl> <dt>You can change:</dt> <dd>&bull; Text</dd> <dt>You can delete it</dt> </dl>";
var UL_INFO = "<dl> <dt>You can't do anything</dt> </dl>";
var IMG_INFO = "<dl> <dt>You can change:</dt> <dd>&bull; Alignment <dl> <dd>- left</dd> <dd>- center</dd> <dd>- right</dd> </dl> </dd> </dl>";
var FOOTER_INFO = "<dl> <dt>You can add:</dt> <dd>&bull; Paragraph</dd> <dd>&bull; Link</dd> <dt>You can change:</dt> <dd>&bull; Color <dl> <dd>- black</dd> <dd>- grey</dd> <dd>- blue</dd> </dl> </dd> <dt>You can delete it</dt> </dl>";
var P_INFO = "<dl> <dt>You can add:</dt> <dd>&bull; Images</dd> <dd>&bull; Links</dd> <dt>You can change:</dt> <dd>&bull; Text color <dl> <dd>- black</dd> <dd>- grey</dd> </dl> </dd> <dd>&bull; Font size <dl> <dd>- large</dd> <dd>- medium</dd> <dd>- small</dd> </dl> </dd> <dt>You can delete it</dt> </dl>";
var JUMBO_INFO = "<dl> <dt>You can add:</dt> <dd>&bull; Headers <dl> <dd>- large</dd> <dd>- medium</dd> <dd>- small</dd> <dd>- extra small</dd> </dl> </dd> <dd>&bull; Paragraph</dd> <dd>&bull; Button <dl> <dd>- large</dd> <dd>- small</dd> <dd>- extra small</dd> </dl> </dd> <dt>You can change:</dt> <dd>&bull; Color <dl> <dd>- blue</dd> <dd>- green</dd> <dd>- red</dd> <dd>- orange</dd> <dd>- white</dd> </dl> </dd> <dd>&bull; Font size <dl> <dd>- large</dd> <dd>- medium</dd> <dd>- small</dd> </dl> </dd> <dt>You can delete it</dt> </dl>";


var $frame,
    $target,
    $popOver,
    $infoDisplay,
    $targetDisplay,
    targetId = MAIN_CONTAINER,
    topOffset = 0,
    addedElement;

$('document').ready(function () {

    // initialize popover
    $popOver = $("#help").popover({html: "true"});
    // grab iframe
    $frame = $("iframe#main");
    // grab info span
    $infoDisplay = $("#info");
    // grab target span
    $targetDisplay = $("#target");

    $('.mic').on("click", function () {
        $(".fa-microphone").toggleClass("blue");
        $("input[name='speech']").focus();
    });

    // select iframes's body on click on crosshair
    $(".fa-crosshairs").on("click", function() {
        $frame.contents().find("#"+MAIN_CONTAINER).click();
    });

    // handle clicks on iframe elements
    $frame.on("load", function () {
        // get target element in iframe by id
        $target = $frame.contents().find("#" + (targetId || MAIN_CONTAINER));
        // bind click event to iframe elements
        $($frame.contents().get(0)).on("click", clickOnElement);
        // "click" an element after iframe has been refreshed
        $target.click();
        // if new element added, find its offset
        if (addedElement) {
            $addElement = $frame.contents().find("#" + addedElement);
            topOffset = $addElement.offset().top + $addElement.innerHeight() / 2 - $(window).height() / 2;
            addedElement = undefined;
        }
        // scroll to previous position or to newly added element
        $frame.contents().scrollTop(topOffset);
        $frame.animate({opacity: 100}, 4500);
    });
});

/*
 Sends query to the server:
 action: "add", "change", "set"
 element: one of the established elements, e.g. "jumbotron", "paragraph" etc.
 target: id of the selected element
 options: a js object that contains additional information, e.g. text, modifier etc.
 */

$('body').on('focus', '[contenteditable]', function() {
    var $this = $(this);
    $this.data('before', $this.html());
    console.log("test");
    return $this;
}).on('blur keyup paste input', '[contenteditable]', function() {
    var $this = $(this);
    if ($this.data('before') !== $this.html()) {
        $this.data('before', $this.html());
        console.log("change");
    }
    return $this;
});

function sendQuery(action, element, target, options) {
    topOffset = $frame.contents().find("body").scrollTop();
    // send a query to the server
    $.ajax({
        url: "editor/query",
        type: "POST",
        // payload as a string
        data: JSON.stringify({"element": element, "target": target, "action": action, "options": options}),
        contentType: "application/json; charset=utf-8",
        // expected type of reply
        dataType: "json",

        success: function (response) {
            console.log(response);
            if (response.status === 'ok') {
                $frame.stop(true).css("opacity", "0");
                addedElement = response.id;
                okStatus(response.message);
                // reload iframe
                $frame.attr('src', $frame.attr('src'));
            }
            else {
                // server couldn't handle request
                errStatus(response.message);
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
    // send a query to the server
    $.ajax({
        url: "editor/query",
        type: "DELETE",
        // payload as a string
        data: JSON.stringify({"target": target}),
        contentType: "application/json; charset=utf-8",
        // expected type of reply
        dataType: "json",
        success: function (response) {
            // set id of a sibling to deleted element
            targetId = response.next || targetId;
            if (response.status === 'ok') {
                $frame.stop(true).css("opacity", "0");
                okStatus(response.message);
                // reload iframe
                $frame.attr('src', $frame.attr('src'));
            }
            else {
                // server couldn't handle request
                errStatus(response.message);
            }
            console.log(response.message);
        },
    });
}

/*
    Click on element handler
*/
function clickOnElement(e) {
    var $clicked = $(e.target);
    // filter clicked element
    if (!$target || $clicked.is("body") || $clicked.is("html")) {
        return;
    }
    $target.css("outline", "none");
    $target = $clicked;
    targetId = $target.prop("id");
    $target.css({"outline": "2px dashed rgb(87, 176, 219)"});
    // update help popover according to a clicked element
    updatePopOver();
}


/*
    Update help popover and show type of selected element
*/
function updatePopOver() {
    switch($target.prop("tagName")) {

        case "DIV":
        if ($target.is("#"+MAIN_CONTAINER)) {
            $targetDisplay.html("page body");
            $popOver.attr("data-content", MAIN_INFO);
        }
        else if ($target.hasClass("navbar")) {
            $targetDisplay.html("navigation bar");
            $popOver.attr("data-content", NAVBAR_INFO);
        }
        else if ($target.hasClass("jumbotron")) {
            $targetDisplay.html("jumbotron");
            $popOver.attr("data-content", JUMBO_INFO);
        }
        else if ($target.hasClass("panel")) {
            $targetDisplay.html("panel");
            $popOver.attr("data-content", PANEL_INFO);
        }
        break;

        case "FOOTER":
        $targetDisplay.html("footer");
        $popOver.attr("data-content", FOOTER_INFO);
        break;

        case "P":
        $targetDisplay.html("paragraph");
        $popOver.attr("data-content", P_INFO);
        break;

        case "IMG":
        $targetDisplay.html("image");
        $popOver.attr("data-content", IMG_INFO);
        break;

        case "UL":
        $targetDisplay.html("panel menu");
        $popOver.attr("data-content", UL_INFO);
        break;

        case "LI":
        $targetDisplay.html("panel item");
        $popOver.attr("data-content", LI_INFO);
        break;

        case "H1":
        $targetDisplay.html("large header");
        $popOver.attr("data-content", H1_INFO);
        break;

        case "H2":
        $targetDisplay.html("medium header");
        $popOver.attr("data-content", H2_INFO);
        break;

        case "H3":
        $targetDisplay.html("small header");
        $popOver.attr("data-content", H3_INFO);
        break;

        case "H4":
        $targetDisplay.html("xsmall header");
        $popOver.attr("data-content", H4_INFO);
        break;

        case "A":
        if ($target.hasClass("btn")) {
            $targetDisplay.html("button");
            $popOver.attr("data-content", BUTTON_INFO);
        }
        else {
            $targetDisplay.html("link");
            $popOver.attr("data-content", A_INFO);
        }
        break;
    }
}

function okStatus(message) {
    $infoDisplay.removeAttr("style").html(message);
}

function errStatus(message) {
    $infoDisplay.css('background-color', 'rgb(231, 197, 188)').html(message);
}
