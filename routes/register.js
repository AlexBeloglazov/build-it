/*
    NOT IN USE. LEFT IN CASE OF LOCAL AUTHENTICATION
*/


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

module.exports = router;
