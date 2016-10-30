var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('header: ', req.session);
    console.log('cookie: ', req.cookies);
    console.log('user:', req.user);
    res.render('index', { title: 'build-it', user: req.user});
});

module.exports = router;
