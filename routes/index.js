var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // console.log('header: ', req.headers);
    // console.log('session: ', req.session);
    // console.log('cookie: ', req.cookies);
    res.render('index', { title: 'build-it' });
});

module.exports = router;
