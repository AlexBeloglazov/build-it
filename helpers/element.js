var MAIN_BODY = "iframe_body";
var MAIN_CONTAINER = "iframe_main";
var CLR_WHITE = "rgb(255,255,255)",
    CLR_BLACK = "rgb(0,0,0)",
    CLR_GREY = "",
    CLR_BLUE = "";

/*
    Helper function to add element to a webpage
*/
function add(req, $, $target) {
    if (!req.body.element)
        return {"err": "no element"};
    var uid = newid();
    // where to add
    switch($target.prop("tagName")) {

        // add to DIV
        case "DIV":
        if ($target.attr("id") === MAIN_CONTAINER) {
            // add to main container
            switch(req.body.element) {

                case 'navigationbar':
                if ($("nav").length)
                    return {"err": "only one allowed"};
                addNavigationBar();
                break;

                case 'sidebar':
                if ($(".sidebar").length)
                    return {"err": "already added"};
                addSideBar();
                break;

                case 'link':
                if (!req.body.options)
                    return {"err": "no parameters"};
                addLink();
                break;

                case 'jumbotron':
                if (!req.body.options)
                    return {"err": "no parameters"};
                addJumbotron();
                break;

                case 'image':
                if (!req.body.options && !req.body.options.link)
                    return {"err": "no link"};
                addImage();
                break;

                case 'paragraph':
                if (!req.body.options && !req.body.options.text)
                    return {"err": "no text"};
                addParagraph();
                break;

                case 'h1':
                if (!req.body.options)
                    return {"err": "no parameters"};
                addH1();
                break;

                case 'h2':
                if (!req.body.options)
                    return {"err": "no parameters"};
                addH2();
                break;

                case 'h3':
                if (!req.body.options)
                    return {"err": "no parameters"};
                addH3();
                break;

                case 'h4':
                if (!req.body.options)
                    return {"err": "no parameters"};
                addH4();
                break;

                case 'button':
                addButton();
                break;

                case 'footer':
                if ($("footer").length)
                    return {"err": "only one allowed"};
                addFooter();
                break;

                default:
                return {"err": "not allowed"};
            }
        }
        else if ($target.hasClass("navigationbar")) {
            // add to navbar
            switch(req.body.element) {
                case 'item':
                case 'page':
                $target.find("ul").append($("<li>").append($("<a>").attr("id", uid).html("Page")));
                break;

                default:
                return {"err": "not allowed"};
            }
        }
        else if ($target.hasClass("sidebar")) {
            // add to sidebar
            switch(req.body.element) {
                case "item":
                // TODO
                break;

                default:
                return {"err": "not allowed"};
            }
        }
        else if ($target.hasClass("jumbotron")) {
            // add to jumbotron
            switch(req.body.element) {
                case 'h1':
                if (!req.body.options)
                    return {"err": "no parameters"};
                addH1();
                break;

                case 'h2':
                if (!req.body.options)
                    return {"err": "no parameters"};
                addH2();
                break;

                case 'h3':
                if (!req.body.options)
                    return {"err": "no parameters"};
                addH3();
                break;

                case 'h4':
                if (!req.body.options)
                    return {"err": "no parameters"};
                addH4();
                break;

                case 'paragraph':
                if (!req.body.options)
                    return {"err": "no parameters"};
                addParagraph();
                break;

                case 'button':
                addButton();
                break;

                default:
                return {"err": "not allowed"};
            }
        }
        else return {"err": "not allowed"}; // not recognized DIV
        break; // end of DIV case

        // add to paragraph
        case "P":
        switch(req.body.element) {
            case "link":
            if (!req.body.options)
                return {"err": "no parameters"};
            addLink();
            break;

            case "image":
            if (!req.body.options && !req.body.options.link)
                return {"err": "no link"};
            addImage();
            break;

            default:
            return {"err": "not allowed"};
        }
        break;

        default:
        return {"err": "not allowed"};
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
                "border": "1px solid rgb(157, 157, 157)",
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
        $("<div>").addClass("jumbotron")
            .attr("id", uid)
            .append($("<h2>").html(req.body.options.text).attr("id", newid()))
            .appendTo($target);
    }
    function addImage() {
        $("<img>").attr({
            "id": uid,
            "src": req.body.options.link,
            "height": req.body.options.height,
            "width": req.body.options.width,
        }).appendTo($target);
    }
    function addParagraph() {
        req.body.options.text = req.body.options.text || "I added a paragraph, but no text has been provided";
        $("<p>").attr("id", uid).html(req.body.options.text).appendTo($target);
    }
    function addH1() {
        req.body.options.text = req.body.options.text || "Header 1";
        $("<h1>").attr("id", uid).html(req.body.options.text).appendTo($target);
    }
    function addH2() {
        req.body.options.text = req.body.options.text || "Header 2";
        $("<h2>").attr("id", uid).html(req.body.options.text).appendTo($target);
    }
    function addH3() {
        req.body.options.text = req.body.options.text || "Header 3";
        $("<h3>").attr("id", uid).html(req.body.options.text).appendTo($target);
    }
    function addH4() {
        req.body.options.text = req.body.options.text || "Header 4";
        $("<h4>").attr("id", uid).html(req.body.options.text).appendTo($target);
    }
    function addButton() {
        var $b = $("<a>").attr({"id": uid, "href": ""}).addClass("btn btn-primary").html("Button");
        var size = req.body.options && req.body.options.size;
        if (size === "large")
            $b.addClass("btn-lg");
        else if (size === "small")
            $b.addClass("btn-sm");
        $b.appendTo($target);
    }
    function addLink() {
        req.body.options.link = req.body.options.link || "#";
        req.body.options.text = req.body.options.text || "Link";
        $("<button>", {"id": uid, "href": req.body.options.link})
            .html(req.body.options.text)
            .appendTo($target);
    }
    function addFooter() {
        var $ftr = $("<footer>")
            .css({
                "background-color": CLR_BLACK,
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
}


/*
    Helper funcion to change/set properties of an element
*/
function change(req, $, $target) {
    return {};
}


/*
    Helper function to generate new id
*/
function newid() {
    return Math.random().toString(36).substr(2);
}


module.exports.add = add;
module.exports.change = change;
