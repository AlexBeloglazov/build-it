var targetContainerId;


$('document').ready(function() {

    $('iframe#main').load(function() {
        targetContainerId = $('iframe#main').contents().find('body').attr('id');
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
            if (response.status === 'ok') {
                // reload iframe
                $('iframe#main').attr('src', $('iframe#main').attr('src'));
                $('iframe#main').load(function() {
                    $('iframe#main').contents().scrollTop($('iframe#main').contents().height());
                });
                okStatus(response.message);
            }
            else {
                // server couldn't handle request
                errStatus(response.message);
            }
        },
    });
}

function okStatus(message) {
    $('span.status').html(message);
    $('span.dstatus').css('color', 'rgb(104, 148, 60)');
}

function errStatus(message) {
    $('span.status').html(message);
    $('span.dstatus').css('color', 'rgb(172, 58, 58)');
}
