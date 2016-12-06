var MAIN_BODY = "iframe_body";
var MAIN_CONTAINER = "iframe_main";
var CLR_WHITE = "rgb(255,255,255)",
    CLR_BLACK = "rgb(51,51,51)",
    CLR_GREY = "rgb(238,238,238)",
    CLR_RED = "rgb(217,83,79)",
    CLR_ORANGE = "rgb(240,173,78)",
    CLR_GREEN = "rgb(92,184,92)",
    CLR_BLUE = "rgb(51,122,183)";
var FNT_XSM = "8px",
    FNT_SM = "14px",
    FNT_MD = "16px",
    FNT_LG = "18px";

/*
    Helper function to add element to a webpage
*/
function add(req, $, $target) {
    var uid = newid();
    var position, $element;
    if (req.body.options && (req.body.options.position === "below" || req.body.options.position === "above"))
        position = req.body.options.position;
    if (position) {
        if ($target.attr("id") === MAIN_CONTAINER) position = "none";
        else if ($target.is("img")) {
            $element = $target;
            $target = $target.parent().parent();
        }
        else {
            $element = $target;
            $target = $target.parent();
        }
    }
    switch(req.body.element) {

        // Navigation Bar
        case "navigationbar":
        if ($("nav").length) return {"err": "only one allowed"};
        if ($target.attr("id") === MAIN_CONTAINER)
            addNavigationBar();
        else return {"err": "not allowed"};
        break;

        // Side Bar
        case "sidebar":
        if ($(".sidebar").length) return {"err": "already added"};
        if ($target.attr("id") === MAIN_CONTAINER)
            addSideBar();
        else return {"err": "not allowed"};
        break;

        // Jumbotron
        case "jumbotron":
        if ($target.attr("id") === MAIN_CONTAINER)
            addJumbotron();
        else return {"err": "not allowed"};
        break;

        // Image
        case "image":
        if (!req.body.options || !req.body.options.link) return {"err": "no link"};
        if ($target.attr("id") === MAIN_CONTAINER || $target.is("p"))
            addImage();
        else return {"err": "not allowed"};
        break;

        // Paragraph
        case "paragraph":
        if (!req.body.options) return {"err": "no parameters"};
        if ($target.attr("id") === MAIN_CONTAINER || $target.hasClass("jumbotron"))
            addParagraph();
        else return {"err": "not allowed"};
        break;

        // Link
        case "link":
        if (!req.body.options) return {"err": "no parameters"};
        if ($target.attr("id") === MAIN_CONTAINER || $target.is("p"))
            addLink();
        else return {"err": "not allowed"};
        break;

        // Button
        case "button":
        if ($target.attr("id") === MAIN_CONTAINER || $target.hasClass("jumbotron"))
            addButton();
        else return {"err": "not allowed"};
        break;

        // Navigation Item/Page
        case "item":
        case "page":
        if ($target.hasClass("navigationbar"))
            $target.find("ul").append($("<li>").append($("<a>").attr("id", uid).html("New Page")));
        else if ($target.hasClass("sidebar")) {
            $target.find("ul").append($("<li>").append($("<a>").attr("id", uid).html("New Item")));
        }
        else return {"err": "not allowed"};
        break;

        // Header 1
        case "h1":
        if (!req.body.options) return {"err": "no parameters"};
        if ($target.attr("id") === MAIN_CONTAINER || $target.hasClass("jumbotron"))
            addH1();
        else return {"err": "not allowed"};
        break;

        // Header 2
        case "h2":
        if (!req.body.options) return {"err": "no parameters"};
        if ($target.attr("id") === MAIN_CONTAINER || $target.hasClass("jumbotron"))
            addH2();
        else return {"err": "not allowed"};
        break;

        // Header 3
        case "h3":
        if (!req.body.options) return {"err": "no parameters"};
        if ($target.attr("id") === MAIN_CONTAINER || $target.hasClass("jumbotron"))
            addH3();
        else return {"err": "not allowed"};
        break;

        // Header 4
        case "h4":
        if (!req.body.options) return {"err": "no parameters"};
        if ($target.attr("id") === MAIN_CONTAINER || $target.hasClass("jumbotron"))
            addH4();
        else return {"err": "not allowed"};
        break;

        // Footer
        case "footer":
        if ($("footer").length) return {"err": "only one allowed"};
        if ($target.attr("id") === MAIN_CONTAINER)
            addFooter();
        else return {"err": "not allowed"};
        break;

        default:
        return {"err": "no such element"};

    }
    return {"message": "element added", "id": uid};


    /*
     * Add functions
     */
    function addNavigationBar() {
        var $brand = $("<div>")
            .addClass("navbar-header")
            .append($("<a>").attr({"href": "#", "id": newid()})
            .addClass("navbar-brand")
            .html("WebSiteName"));
        var $li = $("<li>")
            .addClass("active")
            .append($("<a>").attr({"href": "#", "id": newid()})
            .html("Home"));
        var $ul = $("<ul class='nav navbar-nav'>").append($li);
        var $cont = $("<div>")
            .attr("id", uid)
            .addClass("container navigationbar")
            .append($brand)
            .append($ul);
        var $navbar = $("<nav>").addClass("navbar navbar-inverse").append($cont);
        $("#"+MAIN_BODY).prepend($navbar);
    }
    function addSideBar() {
        var $ul = $("<ul>").addClass("list-unstyled nav");
        for(var i=1; i<4; i++)
            $ul.append($("<li>").append($("<a>").attr({"href": "#", "id": newid()}).html("Item "+i)));
        var $sidebar = $("<div>").attr("id", uid)
            .css({
                "border": "1px solid rgb(189, 189, 189)",
                "min-height": "100px",
                "width": "100%",
                "padding": "25px 15px 50px 15px",
                "font-weight": "bold",
                "font-size": "95%",
            })
            .addClass("sidebar")
            .append($ul);
        var $col = $("<div>").addClass("col-sm-2").append($sidebar);
        $("#"+MAIN_CONTAINER).addClass("col-sm-10");
        $(".row").prepend($col);
    }
    function addJumbotron() {
        var $jumbotron = $("<div>").addClass("jumbotron").attr("id", uid);
        addToPosition($jumbotron);
    }
    function addImage() {
        var $image = $("<div>").addClass("wrap").append($("<img>").attr({
            "id": uid,
            "src": req.body.options.link,
            "height": req.body.options.height,
            "width": req.body.options.width
        }));
        addToPosition($image);
    }
    function addParagraph() {
        req.body.options.text = req.body.options.text || "I added a paragraph, but no text has been provided";
        var $paragraph = $("<p>").attr("id", uid).html(req.body.options.text);
        addToPosition($paragraph);
    }
    function addH1() {
        req.body.options.text = req.body.options.text || "Header 1";
        var $h1 = $("<h1>").attr("id", uid).html(req.body.options.text);
        addToPosition($h1);
    }
    function addH2() {
        req.body.options.text = req.body.options.text || "Header 2";
        var $h2 = $("<h2>").attr("id", uid).html(req.body.options.text);
        addToPosition($h2);
    }
    function addH3() {
        req.body.options.text = req.body.options.text || "Header 3";
        var $h3 = $("<h3>").attr("id", uid).html(req.body.options.text);
        addToPosition($h3);
    }
    function addH4() {
        req.body.options.text = req.body.options.text || "Header 4";
        var $h4 = $("<h4>").attr("id", uid).html(req.body.options.text);
        addToPosition($h4);
    }
    function addButton() {
        var $button = $("<a>").attr({"id": uid, "href": "", "role": "button"}).addClass("btn btn-primary").html("Button");
        var size = req.body.options && req.body.options.size;
        if (size === "large")
            $button.addClass("btn-lg");
        else if (size === "small")
            $button.addClass("btn-sm");
        addToPosition($button);
    }
    function addLink() {
        req.body.options.link = req.body.options.link || "#";
        req.body.options.text = req.body.options.text || "Link";
        var $link = $("<button>", {"id": uid, "href": req.body.options.link}).html(req.body.options.text);
        addToPosition($link);
    }
    function addFooter() {
        var $ftr = $("<footer>")
            .css({
                "background-color": "black",
                "border-top": "1px solid black",
                "padding": "15px 0",
                "margin-top": "20px",
                "text-align": "center"
            })
            .attr("id", uid)
            .addClass("text-muted")
            .html("Copyright &copy; " + (new Date().getFullYear()) + ", " + req.user.name);
        $("#"+MAIN_BODY).append($ftr);
    }
    function addToPosition($createdElement) {
        switch(position) {
            case "above":
            $createdElement.insertBefore($element);
            break;
            case "below":
            $createdElement.insertAfter($element);
            break;
            default:
            $createdElement.appendTo($target);
        }
    }
}


/*
    Helper function to change/set properties of an element
*/
function change(req, $, $target) {
    switch(req.body.options.property) {

        // Size
        case "size":
        switch(req.body.options.value) {

            case "large":
            if($target.hasClass("btn")) {
                $target.removeClass("btn-lg btn-md btn-sm btn-xs");
                $target.addClass("btn-lg");
            }
            else return {"err": "not allowed"};
            break;

            case "medium":
            if($target.hasClass("btn")) {
                $target.removeClass("btn-lg btn-md btn-sm btn-xs");
                $target.addClass("btn-md");
            }
            else return {"err": "not allowed"};
            break;

            case "small":
            if($target.hasClass("btn")) {
                $target.removeClass("btn-lg btn-md btn-sm btn-xs");
                $target.addClass("btn-sm");
            }
            else return {"err": "not allowed"};
            break;

            case "xsmall":
            if($target.hasClass("btn")) {
                $target.removeClass("btn-lg btn-md btn-sm btn-xs");
                $target.addClass("btn-xs");
            }
            else return {"err": "not allowed"};
            break;

            case "custom":
            if (!req.body.options.size.width && !req.body.options.size.height)
                return {"err": "no size"};
            if ($target.is("img")) {
                $target.attr("width", req.body.options.size.width);
                $target.attr("height", req.body.options.size.height);
            }
            else return {"err": "not allowed"};
            break;

            default:
            return {"err": "unknown size"};
        }
        break;

        // Text
        case "text":
        if ($target.is("a, p, h1, h2, h3, h4")) {
            $target.html(req.body.options.value);
        }
        else return {"err": "not allowed"};
        break;

        // URL
        case "url":
        if ($target.is("a"))
            $target.attr("href", req.body.options.value);
        else if ($target.is("img"))
            $target.attr("src", req.body.options.value);
        else return {"err": "not allowed"};
        break;

        // Margin
        case "margin":
        $target.css("margin-top", req.body.options.value.top+"px");
        $target.css("margin-right", req.body.options.value.right+"px");
        $target.css("margin-bottom", req.body.options.value.bottom+"px");
        $target.css("margin-left", req.body.options.value.left+"px");
        break;

        // Padding
        case "padding":
        $target.css("padding-top", req.body.options.value.top+"px");
        $target.css("padding-right", req.body.options.value.right+"px");
        $target.css("padding-bottom", req.body.options.value.bottom+"px");
        $target.css("padding-left", req.body.options.value.left+"px");
        break;

        // Font Color
        case "fontcolor":
        switch(req.body.options.value) {

            case "black":
            if($target.is("p, h1, h2, h3, h4")) {
                $target.css("color", CLR_BLACK);
            }
            else return {"err": "not allowed"};
            break;

            case "blue":
            if($target.is("p, h1, h2, h3, h4")) {
                $target.css("color", CLR_BLUE);
            }
            else return {"err": "not allowed"};
            break;

            case "green":
            if($target.is("p, h1, h2, h3, h4")) {
                $target.css("color", CLR_GREEN);
            }
            else return {"err": "not allowed"};
            break;

            case "red":
            if($target.is("p, h1, h2, h3, h4")) {
                $target.css("color", CLR_RED);
            }
            else return {"err": "not allowed"};
            break;

            case "orange":
            if($target.is("p, h1, h2, h3, h4")) {
                $target.css("color", CLR_ORANGE);
            }
            else return {"err": "not allowed"};
            break;

            case "grey":
            if($target.is("p, h1, h2, h3, h4")) {
                $target.css("color", CLR_GREY);
            }
            else return {"err": "not allowed"};
            break;

            default:
            return {"err": "unknown color"};

        }
        break;

        // Font Size
        case "fontsize":
        switch(req.body.options.value) {

            case "large":
            if ($target.is("h1") || $target.is("h2") || $target.is("h3") || $target.is("h4"))
                $target.replaceWith($("<h1>").attr("id", newid()).html($target.html()));
            else if($target.is("p"))
                $target.css("font-size", FNT_LG);
            else return {"err": "not allowed"};
            break;

            case "medium":
            if ($target.is("h1") || $target.is("h2") || $target.is("h3") || $target.is("h4"))
                $target.replaceWith($("<h2>").attr("id", newid()).html($target.html()));
            else if($target.is("p"))
                $target.css("font-size", FNT_MD);
            else return {"err": "not allowed"};
            break;

            case "small":
            if ($target.is("h1") || $target.is("h2") || $target.is("h3") || $target.is("h4"))
                $target.replaceWith($("<h3>").attr("id", newid()).html($target.html()));
            else if($target.is("p"))
                $target.css("font-size", FNT_SM);
            else return {"err": "not allowed"};
            break;

            case "xsmall":
            if ($target.is("h1") || $target.is("h2") || $target.is("h3") || $target.is("h4"))
                $target.replaceWith($("<h4>").attr("id", newid()).html($target.html()));
            else if($target.is("p"))
                $target.css("font-size", FNT_XSM);
            else return {"err": "not allowed"};
            break;

            default:
            return {"err": "unknown size"};
        }
        break;

        // Color
        case "color":
        switch(req.body.options.value) {

            case "blue":
            if($target.hasClass("btn")) {
                $target.removeClass("btn-default btn-primary btn-danger btn-success btn-warning");
                $target.addClass("btn-primary");
            }
            else if($target.hasClass("jumbotron")) {
                $target.css("background-color", CLR_BLUE);
            }
            else return {"err": "not allowed"};
            break;

            case "green":
            if($target.hasClass("btn")) {
                $target.removeClass("btn-default btn-primary btn-danger btn-success btn-warning");
                $target.addClass("btn-success");
            }
            else if($target.hasClass("jumbotron")) {
                $target.css("background-color", CLR_GREEN);
            }
            else return {"err": "not allowed"};
            break;

            case "red":
            if($target.hasClass("btn")) {
                $target.removeClass("btn-default btn-primary btn-danger btn-success btn-warning");
                $target.addClass("btn-danger");
            }
            else if($target.hasClass("jumbotron")) {
                $target.css("background-color", CLR_RED);
            }
            else return {"err": "not allowed"};
            break;

            case "orange":
            if($target.hasClass("btn")) {
                $target.removeClass("btn-default btn-primary btn-danger btn-success btn-warning");
                $target.addClass("btn-warning");
            }
            else if($target.hasClass("jumbotron")) {
                $target.css("background-color", CLR_ORANGE);
            }
            else return {"err": "not allowed"};
            break;

            case "white":
            if($target.hasClass("btn")) {
                $target.removeClass("btn-default btn-primary btn-danger btn-success btn-warning");
                $target.addClass("btn-default");
            }
            else return {"err": "not allowed"};
            break;

            case "grey":
            if($target.hasClass("jumbotron") || $target.is("footer")) {
                $target.css("background-color", CLR_GREY);
            }
            else return {"err": "not allowed"};
            break;

            case "black":
            if($target.is("footer")) {
                $target.css("background-color", "black");
            }
            else return {"err": "not allowed"};
            break;

            default:
            return {"err": "unknown color"};

        }
        break;

        // Alignment
        case "align":
        switch(req.body.options.value){

            case "left":
            if ($target.is("img")) {
                $target.parent().css("text-align", "left");
            }
            else if ($target.is("p") || $target.is("h1") || $target.is("h2") || $target.is("h3") || $target.is("h4"))
                $target.css("text-align", "left");
            else return {"err": "not allowed"};
            break;

            case "center":
            if ($target.is("img")) {
                $target.parent().css("text-align", "center");
            }
            else if ($target.is("p") || $target.is("h1") || $target.is("h2") || $target.is("h3") || $target.is("h4"))
                $target.css("text-align", "center");
            else return {"err": "not allowed"};
            break;

            case "right":
            if ($target.is("img")) {
                $target.parent().css("text-align", "right");
            }
            else if ($target.is("p") || $target.is("h1") || $target.is("h2") || $target.is("h3") || $target.is("h4"))
                $target.css("text-align", "right");
            else return {"err": "not allowed"};
            break;

            default:
            return {"err": "wrong option"};
        }
        break;

        default:
        return {"err": "unknown property"};

    }
    return {"message": "property changed"};
}


/*
    Helper function to generate new id
*/
function newid() {
    return Math.random().toString(36).substr(2);
}


module.exports.add = add;
module.exports.change = change;
