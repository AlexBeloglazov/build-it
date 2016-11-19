var express = require('express');
var ejs = require('ejs');
var Page = require('../models/page');
var cheerio = require('cheerio');
var html = require('html');
var yazl = require('yazl');
var element = require('../helpers/element'); // contains functions to change/add elements

var router = express.Router();


/*
    Landing page for logged user
*/
router.get('/', function(req, res) {
    // console.log("SESSION: ", req.session);
    // console.log("COOKIES: ", req.cookies);
    // console.log("HEADERS: ", req.headers);
    Page.find({user: req.user.id}, function(err, data) {
        if (err)
            return res.sendStatus(500);
        // res.setHeader("Pragma","no-cache");
        // res.setHeader("Cache-Control","no-cache, no-store, must-revalidate");
        // res.setHeader("Expires","0");
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
            webpage.save();
            // remember webpage id in session
            req.session.webpageid = webpage._id;
            // pass newly created webpage id to renderer
            res.redirect('editor?webpageid='+webpage._id);
        });
    }
});


/*
    Handle editing request
*/
router.post('/editor/query', function(req, res) {
    if (!req.body.target)
        return sendErr("no id");
    // grab a webpage user currently is working with
    Page.findOne({_id: req.session.webpageid, user: req.user.id}, function(err, webpage) {
        // console.log(req.body);
        if (err)
            return sendErr("internal error");
        if (!webpage)
            return sendErr("bad request");
        var $ = cheerio.load(webpage.html);
        var $target = $('#'+req.body.target);
        var status;
        switch(req.body.action) {
            case "add":
            status = element.add(req, $, $target)
            break;

            case "set":
            case "change":
            status = element.change(req, $, $target);
            break;

            default:
            return sendErr("bad action");
        }
        if (status.err)
            return sendErr(status.err);
        webpage.html = $.html();
        webpage.save();
        sendOk(status.message, status.id);
    });


    function sendOk(message, id) {
        res.json({"status": "ok", "message": message, "id": id});
    }

    function sendErr(message) {
        res.json({"status": "error", "message": message});
    }
});


/*
    Handle deletion request
*/
router.delete("/editor/query", function(req, res) {
    if (!req.body.target)
        return res.json({"status": "error", "message": "no id"});
    Page.findOne({_id: req.session.webpageid, user: req.user.id}, function(err, webpage) {
        if (!webpage)
            return res.json({"status": "error", "message": "bad request"});
        var $ = cheerio.load(webpage.html)
        var target = $("#"+req.body.target);
        if (target.length === 0)
            return res.json({"status": "error", "message": "not found"});
        if (target.is("body") || req.body.target === "iframe_main")
            return res.json({"status": "error", "message": "not allowed"});
        var next = undefined;
        if (target.next().length)
            next = target.next().attr("id");
        else if (target.prev().length)
            next = target.prev().attr("id");
        else
            next = target.parent().attr("id");
        target.remove();
        webpage.html = $.html();
        webpage.save();
        res.json({"status": "ok", "message": "deleted", "next": next});
    });
});


/*
    Serve user's HTML page
*/
router.get('/pages/:pageid', function(req, res) {
    Page.findOne({_id: req.params.pageid, user: req.user.id}, function(err, webpage) {
        if (!webpage)
            return res.sendStatus(404);
        res.send(html.prettyPrint(webpage.html));
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


/*
    Get archived webpage
*/
router.get('/editor/save', function(req,res) {
    Page.findOne({_id: req.session.webpageid, user: req.user.id}, function(err, page) {
        if (!page)
            return res.sendStatus(404);
        res.attachment("webpage.zip");
        var zipFile = new yazl.ZipFile();
        zipFile.addBuffer(new Buffer(html.prettyPrint(page.html), "utf-8"), "index.html");
        zipFile.outputStream.pipe(res);
        zipFile.end();
    });
});


module.exports = router;
