var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    console.log('session: ', req.user);
    if (!req.user)
        res.redirect('/auth/facebook');
    else
        res.render('user', {title: 'build-it', user: req.user});
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
