var CURRENT_ID = 0;
var CURRENT_OBJECT = null;
var ID_STACK = [];

var NEW_PARAGRAPH = "<p contenteditable='true'>" + "Lorem ipsum dolor sit amet, consectetur " +
    "adipiscing elit, sed do eiusmod tempor incididunt ut " +
    "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip " +
    "ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat " +
    "nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim ";

var NEW_LIST = '<ul contenteditable="true" class="list-group"> \
    <li class="list-group-item">Cras justo odio</li>\
<li class="list-group-item">Dapibus ac facilisis in</li>\
<li class="list-group-item">Morbi leo risus</li>\
<li class="list-group-item">Porta ac consectetur ac</li>\
<li class="list-group-item">Vestibulum at eros</li>\
</ul>';

var NEW_HEADING = '<h3 contenteditable="true"> Lorem Ipsum </h3>';

var NEW_NAVBAR = '<nav contenteditable="true" class="navbar navbar-light bg-faded">\
    <a class="navbar-brand" href="#">Navbar</a>\
    <ul class="nav navbar-nav">\
    <li class="nav-item active">\
    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>\
    </li>\
    <li class="nav-item">\
    <a class="nav-link" href="#">Link</a>\
    </li>\
    <li class="nav-item">\
    <a class="nav-link" href="#">Link</a>\
    </li>\
    <li class="nav-item dropdown">\
    <a class="nav-link dropdown-toggle" href="http://example.com" id="supportedContentDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>\
    <div class="dropdown-menu" aria-labelledby="supportedContentDropdown">\
    <a class="dropdown-item" href="#">Action</a>\
    <a class="dropdown-item" href="#">Another action</a>\
<a class="dropdown-item" href="#">Something else here</a>\
</div>\
</li>\
</ul>\
    </nav>';


var NEW_FOOTER = '<footer contenteditable="true" class="footer">\
    <div class="container">\
    <span class="text-muted">Place sticky footer content here.</span>\
</div>\
</footer>';

$(document).ready(function () {

    var PAGE = $('#page');

    $('#add').click(function () {
        var INSERT_POSITION = $("input[type='radio'][name='options']:checked").val();

        var div = document.createElement('div');
        div.className = 'page-contents';
        div.id = CURRENT_ID;

        if (CURRENT_OBJECT === "PARAGRAPH") {
            div.innerHTML = NEW_PARAGRAPH;
        }
        else if (CURRENT_OBJECT === "LIST") {
            div.innerHTML = NEW_LIST;
        }
        else if (CURRENT_OBJECT === "HEADING") {
            div.innerHTML = NEW_HEADING;
        }
        else if (CURRENT_OBJECT === "NAVBAR") {
            div.innerHTML = NEW_NAVBAR;
        }
        else if (CURRENT_OBJECT === "FOOTER") {
            div.innerHTML = NEW_FOOTER;
        }

        if (INSERT_POSITION === "ABOVE") {
            PAGE.prepend(div);
        } else {
            PAGE.append(div);
        }

        ID_STACK.push(CURRENT_ID);
        CURRENT_ID += 1;
    });

    $('.btn-group-vertical').click(function (id) {
        CURRENT_OBJECT = id['target']['value'];
        console.log(CURRENT_OBJECT);
    });

    $('#undo').click(function () {
        if(ID_STACK.length > 0){
            removeItem = ID_STACK.pop();
            $('#' + removeItem).remove();
        }
    })
});
