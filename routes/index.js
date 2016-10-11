var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // console.log('header: ', req.headers);
    console.log('session: ', req.session);
    res.render('index', { title: 'build-it', user: req.user});
});

module.exports = router;
