var express = require('express');
var ejs = require('ejs');
var Page = require('../models/page');
var cheerio = require('cheerio');

var router = express.Router();


/*
    Landing page for logged user
*/
router.get('/', function(req, res) {
    console.log("SESSION: ", req.session);
    console.log("COOKIES: ", req.cookies);
    console.log("HEADERS: ", req.headers);
    Page.find({user: req.user.id}, function(err, data) {
        if (err)
            return res.sendStatus(500);
        res.setHeader("Pragma","no-cache");
        res.setHeader("Cache-Control","no-cache, no-store, must-revalidate");
        res.setHeader("Expires","0");
        res.render('user', {title: 'build-it', user: req.user, ids: data});
    });
});


/*
    Log user out
*/
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


/*
    Open editor for either empty or chosen webpage
*/
router.get('/editor', function(req, res) {
    // existed webpage requested
    if (req.query.webpageid) {
        // save id of chosen webpage in session
        req.session.webpageid = req.query.webpageid;
        res.render('editor', {user: req.user, pageid: req.query.webpageid});
    }
    // user creates new webpage
    else {
        // create document with empty webpage
        webpage = new Page();
        // render empty webpage to get string representation
        ejs.renderFile('views/empty.ejs', {'page': webpage._id}, function(err, html) {
            // populate document's fields
            webpage.user = req.user.id;
            webpage.html = html;
            webpage.nextid = 0;
            webpage.save();
            // remember webpage id in session
            req.session.webpageid = webpage._id;
            // pass newly created webpage id to renderer
            res.render('editor', {user: req.user, pageid: webpage._id});
        });
    }
});


/*
    Handle editing request
*/
router.post('/editor/query', function(req, res) {
    // grab a webpage user currently working with
    Page.findOne({_id: req.session.webpageid}, function(err, webpage) {
        console.log("Error: ", err);
        console.log(req.body);
        if (!webpage)
            return sendErr("bad request");
        var $ = cheerio.load(webpage.html);
        var nextid = String(webpage.nextid);
        var target = '#'+req.body.target;
        // handle action
        switch(req.body.action) {
            case 'add':
            // figure which element to add
            switch(req.body.element) {
                case 'jumbotron':
                $("<div>").addClass("jumbotron")
                    .attr("id", nextid)
                    .append($("<h2>").html(req.body.options.text))
                    .appendTo(target);
                break;

                case 'paragraph':
                $("<p>").attr("id", nextid).html(req.body.options.text).appendTo(target);
                break;

                case 'h1':
                $("<h1>").attr("id", nextid).html(req.body.options.text).appendTo(target);
                break;

                case 'h2':
                $("<h2>").attr("id", nextid).html(req.body.options.text).appendTo(target);
                break;

                case 'h3':
                $("<h3>").attr("id", nextid).html(req.body.options.text).appendTo(target);
                break;

                case 'button':
                $("<button>").attr("id", nextid).addClass("btn btn-primary").html("Button").appendTo(target);
                break;

                case 'image':
                $("<img>").attr({
                    "id": nextid,
                    "src": req.body.options.link,
                    "height": req.body.options.height,
                    "width": req.body.options.width,
                }).appendTo(target);
                break;

                default:
                return sendErr("bad element");
            }
            webpage.nextid += 1;
            webpage.html = $.html();
            webpage.save();
            sendOk("element added");
            break;

            case 'delete':
            var last = $(target).children().last();
            if (last.length === 0)
                return sendErr("no elements in container");
            last.remove();
            webpage.html = $.html();
            webpage.save();
            sendOk("element deleted");
            break;

            default:
            return sendErr("bad action");
        }

    });

    function sendOk(message) {
        res.json({"status": "ok", "message": message});
    }

    function sendErr(message) {
        res.json({"status": "error", "message": message});
    }
});


/*
    Serve user's HTML page
*/
router.get('/pages/:pageid', function(req, res) {
    Page.findOne({_id: req.params.pageid, user: req.user.id}, function(err, webpage) {
        if (!webpage)
            return res.sendStatus(404);
        res.send(webpage.html);
    })
});

/*
    Handle webpage deletion requests
*/
router.delete('/pages/delete', function(req, res) {
    Page.findOneAndRemove({_id: req.body.pageid, user: req.user.id}, function(err, webpage) {
        if (webpage)
            return res.json({"status": "ok"});
        return res.json({"status": "error"});
    });
});

module.exports = router;
