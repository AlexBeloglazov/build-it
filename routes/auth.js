var express = require('express');
var route = express.Router();

module.exports = function(passport) {
    /*
        Route to facebook auth page
    */
    route.get('/facebook', passport.authenticate('facebook'));

    /*
        Defines callback route from facebook
    */
    route.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/user',
                                                                        failureRedirect: '/'}));

    return route;
};
