var express = require('express');
var route = express.Router();
var configuredPassport = require('../helpers/auth');

/*
    Route to facebook auth page
*/
route.get('/facebook', configuredPassport.authenticate('facebook'));

/*
    Defines callback route for facebook
*/
route.get('/facebook/callback', configuredPassport.authenticate('facebook', { successRedirect: '/user',
                                                                    failureRedirect: '/'}));

/*
    Route to google auth page
*/
route.get('/google', configuredPassport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login']}));

/*
    Defines callback route for google
*/
route.get('/google/callback', configuredPassport.authenticate('google', { successRedirect: '/user',
                                                                    failureRedirect: '/'}));

module.exports = route;
