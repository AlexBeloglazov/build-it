var fbStrategy = require('passport-facebook').Strategy,
    googleStrategy = require('passport-google-oauth2').Strategy,
    config = require('./config'),
    passport = require('passport'),
    User = require('../models/user');


/*
    Define a function invoked by req.login() after authentification. Attaches passport.user object to a session
*/
passport.serializeUser(function(user, done) {
    done(null, user.id);
});


/*
    Define a function that gets user from MongoDB and attaches user object to req.user
*/
passport.deserializeUser(function(id, done) {
    User.findOne({'id': id}, function(err, user) {
        done(err, user);
    });
});


/*
    Function verifiers whether user with certain social id exists in DB
*/
var verifier = function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        User.findOne({'id': profile.id}, function(err, user) {
            if (err)
                done(err);
            if (user)
                done(null, user);
            else {
                var newUser = new User();
                newUser.id = profile.id;
                newUser.name = profile.displayName;
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
    });
};


/*
    Configure passportJS strategy for facebook authentification
*/
passport.use(new fbStrategy(
    {
        clientID: config.auth.fb.clientID,
        clientSecret: config.auth.fb.clientSecret,
        callbackURL: config.auth.fb.callbackURL,
    },
    verifier
));


/*
    Configure passportJS strategy for google+ authentification
*/
passport.use(new googleStrategy(
    {
        clientID: config.auth.google.clientID,
        clientSecret: config.auth.google.clientSecret,
        callbackURL: config.auth.google.callbackURL
    },
    verifier
));


module.exports = passport;
