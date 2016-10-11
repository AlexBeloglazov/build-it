/*
    NOT IN USE. LEFT IN CASE OF LOCAL AUTHENTICATION
*/

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
    res.json(req.body);
});

module.exports = router;
