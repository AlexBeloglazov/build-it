/*
    Helper function to add element to a webpage
*/
function add(req, $, $target) {
    var uid = newid();
    // where to add
    switch($target.prop("tagName")) {

        case "DIV":
        switch(req.body.element) {

            case 'jumbotron':
            $("<div>").addClass("jumbotron")
                .attr("id", uid)
                .append($("<h2>").html(req.body.options.text).attr("id", newid()))
                .appendTo($target);
            break;

            case 'image':
            $("<img>").attr({
                "id": uid,
                "src": req.body.options.link,
                "height": req.body.options.height,
                "width": req.body.options.width,
            }).appendTo($target);
            break;

            case 'paragraph':
            $("<p>").attr("id", uid).html(req.body.options.text).appendTo($target);
            break;

            case 'h1':
            $("<h1>").attr("id", uid).html(req.body.options.text).appendTo($target);
            break;

            case 'h2':
            $("<h2>").attr("id", uid).html(req.body.options.text).appendTo($target);
            break;

            case 'h3':
            $("<h3>").attr("id", uid).html(req.body.options.text).appendTo($target);
            break;

            case 'button':
            $("<button>").attr("id", uid).addClass("btn btn-primary").html("Button").appendTo($target);
            break;
        }
        break; // end of DIV case

        case "P":
        switch(req.body.element) {
            case "link":
            break;

            case "image":
            break;

            default:
            return {"err": "not allowed"};
        }
        break;

        case "UL":
        switch(req.body.element) {
            case "item":
            break;

            default:
            return {"err": "not allowed"};
        }
        break;

        default:
        return {"err": "not allowed"};
    }
    return {"message": "element added", "id": uid};
}


/*
    Helper funcion to change/set propertie of an element
*/
function change(req, $, $target) {

}


/*
    Helper function to generate new id
*/
function newid() {
    return Math.random().toString(36).substr(2);
}


module.exports.add = add;
module.exports.change = change;
