/*
    NOT IN USE. LEFT IN CASE OF LOCAL AUTHENTICATION
*/
var mon = require('../models/user');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // res.render('login', { title: 'Login' });
  mon.findById({_id: '57fc701ce528347f15a2542'}, function(error, r) {
      res.send(r);
  });
});

router.post('/', function(req, res, next) {
    res.json(req.body);
});

module.exports = router;
