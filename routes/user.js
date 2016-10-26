var express = require('express');
var ejs = require('ejs');
var Page = require('../models/page');
var cheerio = require('cheerio');

var router = express.Router();


/*
    Landing page for logged user
*/
router.get('/', function(req, res) {
    res.render('user', {title: 'build-it', user: req.user});
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
    if (req.query.webpageid) {
        // open existing webpage
        // TODO
    }
    else {
        // create document with empty webpage
        webpage = new Page();
        // render empty webpage to get string representation
        ejs.renderFile('views/empty.ejs', {'page': webpage._id}, function(err, html) {
            // populate document's fields
            webpage.user = req.user.id;
            webpage.html = html;
            webpage.save();
            // remember webpage id in session object
            req.session.webpageid = webpage._id;
            // pass newly created webpage id to renderer
            res.render('editor', {user: req.user, siteid: webpage._id});
        });
    }
});


/*
    Handle editing request
*/
router.post('/editor/query', function(req, res) {
    var $;
    Page.findOne({_id: req.session.webpageid}, function(err, webpage) {
        $ = cheerio.load(webpage.html);
    });
    // parse request and make changes
    // TODO
});


/*
    Serve user's HTML page
*/
router.get('/sites/:pageID', function(req, res) {
    Page.findOne({_id: req.params.pageID}, function(err, webpage) {
        res.send(webpage.html);
    })
});

module.exports = router;
