var MAIN_CONTAINER = "iframe_main";
var MAIN_INFO = "<dl> <dt>You can add:</dt> <dd>&bull; Navigational bar</dd> <dd>&bull; Side bar <dl> <dd>- to left</dd> <dd>- to right</dd> </dl> </dd> <dd>&bull; Header <dl> <dd>- large</dd> <dd>- medium</dd> <dd>- small</dd> <dd>- extra small</dd> </dl> </dd> <dd>&bull; Paragraph</dd> <dd>&bull; Jumbotron</dd> <dd>&bull; Image</dd> <dd>&bull; Link</dd> <dd>&bull; Button <dl> <dd>- large</dd> <dd>- medium (default)</dd> <dd>- small</dd> <dd>- extra small</dd> </dl> </dd> <dd>&bull; Footer</dd> <dt>You can change:</dt> <dd>&bull; Background color <dl> <dd>- blue</dd> <dd>- green</dd> <dd>- red</dd> <dd>- orange</dd> <dd>- white</dd> </dl> </dd> <dt>You can delete it</dt> </dl>";
var H1_INFO = "<dl> <dt>You can change:</dt> <dd>&bull; Size <dl> <dd>- medium</dd> <dd>- small</dd> <dd>- extra small</dd> </dl> </dd> <dd>&bull; Alignment <dl> <dd>- left</dd> <dd>- center</dd> <dd>- right</dd> </dl> </dd> <dd>&bull; Text color <dl> <dd>- black</dd> <dd>- grey</dd> <dd>- orange</dd> <dd>- green</dd> <dd>- red</dd> <dd>- blue</dd> </dl> </dd> <dt>You can delete it</dt> </dl>";
var H2_INFO = "<dl> <dt>You can change:</dt> <dd>&bull; Size <dl> <dd>- large</dd> <dd>- small</dd> <dd>- extra small</dd> </dl> </dd> <dd>&bull; Alignment <dl> <dd>- left</dd> <dd>- center</dd> <dd>- right</dd> </dl> </dd> <dd>&bull; Text color <dl> <dd>- black</dd> <dd>- grey</dd> <dd>- orange</dd> <dd>- green</dd> <dd>- red</dd> <dd>- blue</dd> </dl> </dd> <dt>You can delete it</dt> </dl>";
var H3_INFO = "<dl> <dt>You can change:</dt> <dd>&bull; Size <dl> <dd>- large</dd> <dd>- medium</dd> <dd>- extra small</dd> </dl> </dd> <dd>&bull; Alignment <dl> <dd>- left</dd> <dd>- center</dd> <dd>- right</dd> </dl> </dd> <dd>&bull; Text color <dl> <dd>- black</dd> <dd>- grey</dd> <dd>- orange</dd> <dd>- green</dd> <dd>- red</dd> <dd>- blue</dd> </dl> </dd> <dt>You can delete it</dt> </dl>";
var H4_INFO = "<dl> <dt>You can change:</dt> <dd>&bull; Size <dl> <dd>- large</dd> <dd>- medium</dd> <dd>- small</dd> <dd>- extra small</dd> </dl> </dd> <dd>&bull; Alignment <dl> <dd>- left</dd> <dd>- center</dd> <dd>- right</dd> </dl> </dd> <dd>&bull; Text color <dl> <dd>- black</dd> <dd>- grey</dd> <dd>- orange</dd> <dd>- green</dd> <dd>- red</dd> <dd>- blue</dd> </dl> </dd> <dt>You can delete it</dt> </dl>";
var A_INFO = "<dl> <dt>You can change:</dt> <dd>&bull; Size <dl> <dd>- large</dd> <dd>- medium</dd> <dd>- small</dd> </dl> </dd> <dt>You can delete it</dt> </dl>";
var BUTTON_INFO = "<dl> <dt>You can change:</dt> <dd>&bull; Size <dl> <dd>- large</dd> <dd>- medium</dd> <dd>- small</dd> <dd>- extra small</dd> </dl> </dd> <dd>&bull; Color <dl> <dd>- blue</dd> <dd>- green</dd> <dd>- red</dd> <dd>- orange</dd> <dd>- white</dd> </dl> </dd> </dl>";
var NAV_ITEM_INFO = "<dl> <dt>You can change:</dt> <dd>&bull; Text</dd> <dt>You can delete it</dt> </dl>";
var SIDEBAR_INFO = "<dl> <dt>You can add:</dt> <dd>&bull; New sidebar item </dd> <dt>You can delete it</dt> </dl>";
var IMG_INFO = "<dl> <dt>You can change:</dt> <dd>&bull; Alignment <dl> <dd>- left</dd> <dd>- center</dd> <dd>- right</dd> </dl> </dd> <dt>You can delete it</dt> </dl>";
var FOOTER_INFO = "<dl> <dt>You can change:</dt> <dd>&bull; Text</dd> <dd>&bull; Color <dl> <dd>- black</dd> <dd>- grey</dd> </dl> </dd> <dt>You can delete it</dt> </dl>";
var P_INFO = "<dl> <dt>You can add:</dt> <dd>&bull; Images</dd> <dd>&bull; Links</dd> <dt>You can change:</dt> <dd>&bull; Text color <dl> <dd>- black</dd> <dd>- grey</dd> <dd>- orange</dd> <dd>- green</dd> <dd>- red</dd> <dd>- blue</dd> </dl> </dd> <dd>&bull; Font size <dl> <dd>- large</dd> <dd>- medium</dd> <dd>- small</dd> <dd>- extra small</dd> </dl> </dd> <dt>You can delete it</dt> </dl>";
var JUMBO_INFO = "<dl> <dt>You can add:</dt> <dd>&bull; Headers <dl> <dd>- large</dd> <dd>- medium</dd> <dd>- small</dd> <dd>- extra small</dd> </dl> </dd> <dd>&bull; Paragraph</dd> <dd>&bull; Button <dl> <dd>- large</dd> <dd>- medium (default)</dd> <dd>- small</dd> <dd>- extra small</dd> </dl> </dl> </dd> <dt>You can change:</dt> <dd>&bull; Color <dl> <dd>- grey</dd> <dd>- blue</dd> <dd>- green</dd> <dd>- red</dd> <dd>- orange</dd> </dl> </dd> <dt>You can delete it</dt> </dl>";
var NAVBAR_INFO = "<dl> <dt>You can add:</dt> <dd>&bull; New page item </dd> <dt>You can delete it</dt> </dl>";
var UNKNOWN_INFO = "<dl> <dt>You can't do anything</dt> </dl>";


var $frame,
    $target,
    $popOver,
    $infoDisplay,
    $targetDisplay,
    targetId = MAIN_CONTAINER,
    topOffset = 0,
    addedElement;
var dictation_obj,
    dictation_working,
    dictation_text;

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
        $($frame.contents().get(0)).on("dblclick", "a, div.jumbotron, img, p, h1, h2, h3, h4, footer", dblClickOnElement);
        // "click" an element after iframe has been refreshed
        $target.click();
        // if new element added, find its offset
        if (addedElement) {
            $addElement = $frame.contents().find("#"+(addedElement));
            topOffset = $addElement.offset().top + $addElement.innerHeight()/2 - $(window).height()/2;
            addedElement = undefined;
        }
        // scroll to previous position or to newly added element
        $frame.contents().scrollTop(topOffset);
        $frame.animate({opacity: 100}, 4500);
    });
});


// $('body').on('focus', '[contenteditable]', function() {
//     var $this = $(this);
//     $this.data('before', $this.html());
//     console.log("test");
//     return $this;
// }).on('blur keyup paste input', '[contenteditable]', function() {
//     var $this = $(this);
//     if ($this.data('before') !== $this.html()) {
//         $this.data('before', $this.html());
//         console.log("change");
//     }
//     return $this;
// });


/*
     Sends query to the server:
     action: "add", "change", "set"
     element: one of the established elements, e.g. "jumbotron", "paragraph" etc.
     target: id of the selected element
     options: a js object that contains additional information, e.g. text, modifier etc.
 */
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
    if (!$target ||
        $clicked.is("body") ||
        $clicked.is("html") ||
        $clicked.hasClass("row") ||
        $clicked.hasClass("navbar") ||
        $clicked.hasClass("col-sm-2") ||
        // $clicked.hasClass("container") ||
        $clicked.hasClass("wrap")
    ) return;
    $target.css("outline", "none");
    $target = $clicked;
    targetId = $target.prop("id");
    $target.css({"outline": "2px dashed rgb(87, 176, 219)"});
    // update help popover according to a clicked element
    updatePopOver();
    return false;
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
        else if ($target.hasClass("navigationbar")) {
            $targetDisplay.html("navigation bar");
            $popOver.attr("data-content", NAVBAR_INFO);
        }
        else if ($target.hasClass("sidebar")) {
            $targetDisplay.html("side bar");
            $popOver.attr("data-content", SIDEBAR_INFO);
        }
        else if ($target.hasClass("jumbotron")) {
            $targetDisplay.html("jumbotron");
            $popOver.attr("data-content", JUMBO_INFO);
        }
        else {
            $targetDisplay.html("unknown");
            $popOver.attr("data-content", UNKNOWN_INFO);
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
        else if ($target.parent().parent().hasClass("nav") || $target.parent().parent().hasClass("sidebar")) {
            $targetDisplay.html("navigation item");
            $popOver.attr("data-content", NAV_ITEM_INFO);
        }
        else {
            $targetDisplay.html("link");
            $popOver.attr("data-content", A_INFO);
        }
        break;

        default:
        $targetDisplay.html("unknown");
        $popOver.attr("data-content", UNKNOWN_INFO);
    }
    return false;
}

function dblClickOnElement(e) {
    var textDim = {};
    e.stopPropagation();
    // Deactivate dictation button
    $("#text .btn").removeClass("active");
    // Enable tabs
    $(".nav-tabs li").removeClass("disabled active").children().attr("data-toggle", "tab");
    $(".tab-content div").removeClass("active");
    // Setting values
    $("#text > textarea").val($target.html());
    $("#size input[name='width']").val($target.outerWidth());
    $("#size input[name='height']").val($target.outerHeight());
    textDim.top = $target.css("margin-top");
    textDim.right = $target.css("margin-right");
    textDim.bottom = $target.css("margin-bottom");
    textDim.left = $target.css("margin-left");
    margin = {
        top: textDim.top !== null ? parseInt(textDim.top) : 0,
        right: textDim.right !== null ? parseInt(textDim.right) : 0,
        bottom: textDim.bottom !== null ? parseInt(textDim.bottom) : 0,
        left: textDim.left !== null ? parseInt(textDim.left) : 0
    };
    $("#margin input[name='top']").val(margin.top);
    $("#margin input[name='right']").val(margin.right);
    $("#margin input[name='bottom']").val(margin.bottom);
    $("#margin input[name='left']").val(margin.left);
    textDim.top = $target.css("padding-top");
    textDim.right = $target.css("padding-right");
    textDim.bottom = $target.css("padding-bottom");
    textDim.left = $target.css("padding-left");
    padding = {
        top: textDim.top !== null ? parseInt(textDim.top) : 0,
        right: textDim.right !== null ? parseInt(textDim.right) : 0,
        bottom: textDim.bottom !== null ? parseInt(textDim.bottom) : 0,
        left: textDim.left !== null ? parseInt(textDim.left) : 0
    };
    $("#padding input[name='top']").val(padding.top);
    $("#padding input[name='right']").val(padding.right);
    $("#padding input[name='bottom']").val(padding.bottom);
    $("#padding input[name='left']").val(padding.left);
    if ($target.is("a")) {
        $("#link > textarea").val($target.attr("href"));
        // activate text tab
        $(".nav-tabs a[href='#text']").parent().addClass("active");
        $("div#text").addClass("active");
        // disable size tab
        $(".nav-tabs a[href='#size']").attr("data-toggle", "").parent().addClass("disabled");

    }
    else if ($target.is("img")) {
        $("#link > textarea").val($target.attr("src"));
        // activate link tab
        $(".nav-tabs a[href='#link']").parent().addClass("active");
        $("div#link").addClass("active");
        // disable text field
        $(".nav-tabs a[href='#text']").attr("data-toggle", "").parent().addClass("disabled");
    }
    else if ($target.is("p, h1, h2, h3, h4, footer")) {
        // activate text tab
        $(".nav-tabs a[href='#text']").parent().addClass("active");
        $("div#text").addClass("active");
        // disable link, size tabs
        $(".nav-tabs a[href='#link']").attr("data-toggle", "").parent().addClass("disabled");
        $(".nav-tabs a[href='#size']").attr("data-toggle", "").parent().addClass("disabled");
    }
    else {
        // activate margin tab
        $(".nav-tabs a[href='#margin']").parent().addClass("active");
        $("div#margin").addClass("active");
        // disable text, link, size tabs
        $(".nav-tabs a[href='#text']").attr("data-toggle", "").parent().addClass("disabled");
        $(".nav-tabs a[href='#link']").attr("data-toggle", "").parent().addClass("disabled");
        $(".nav-tabs a[href='#size']").attr("data-toggle", "").parent().addClass("disabled");

    }
    $("#modalProperties").modal("toggle");
}

function modalDictation(b) {
    if (dictation_working) {
        reset();
    }
    else {
        $(b).addClass("active");
        dictation_obj = new webkitSpeechRecognition();
        dictation_obj.continuous = true;
        dictation_obj.maxAlternatives = 5;
        dictation_obj.interimResults = true;
        dictation_obj.lang = "en-US";
        dictation_obj.onend = reset;
        dictation_obj.onerror = reset;
        dictation_obj.onresult = function(e) {
            var final_transcript = $("#text textarea").val();
            if (typeof(e.results) == 'undefined') {
              reset();
              return;
            }
            for (var i = e.resultIndex; i < e.results.length; ++i) {
              var val = e.results[i][0].transcript;
              if (e.results[i].isFinal)
                final_transcript += " " + val;
            }
            $("#text textarea").val(final_transcript);
        };
        dictation_working = true;
        dictation_obj.start();
    }

    function reset() {
        dictation_working = false;
        dictation_obj.stop();
        dictation_obj = undefined;
        $("#dictation").removeClass("active");
    }
}

function modalText() {
    var text = $("#text textarea").val();
    setTimeout(function() {
        sendQuery("set", "", targetId, {"property": "text", "value": text});
    }, 300);
}

function modalLink() {
    var url = $("#link textarea").val();
    setTimeout(function() {
        sendQuery("set", "", targetId, {"property": "url", "value": url});
    }, 300);
}

function modalSize() {
    var size = {
        "width": $("#size input[name='width']").val() || 0,
        "height": $("#size input[name='height']").val() || 0
    };
    setTimeout(function() {
        sendQuery("set", "", targetId, {"property": "size", "value": "custom", "size": size});
    }, 300);
}

function modalMargin() {
    var margin = {
        "top": $("#margin input[name='top']").val() || 0,
        "right": $("#margin input[name='right']").val() || 0,
        "bottom": $("#margin input[name='bottom']").val() || 0,
        "left": $("#margin input[name='left']").val() || 0
    };
    setTimeout(function() {
        sendQuery("set", "", targetId, {"property": "margin", "value": margin});
    }, 300);
}

function modalPadding() {
    var padding = {
        "top": $("#padding input[name='top']").val() || 0,
        "right": $("#padding input[name='right']").val() || 0,
        "bottom": $("#padding input[name='bottom']").val() || 0,
        "left": $("#padding input[name='left']").val() || 0
    };
    setTimeout(function() {
        sendQuery("set", "", targetId, {"property": "padding", "value": padding});
    }, 300);
}

function okStatus(message) {
    $infoDisplay.removeAttr("style").html(message);
}

function errStatus(message) {
    $infoDisplay.css('background-color', 'rgb(231, 197, 188)').html(message);
}
