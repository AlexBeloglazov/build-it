var fbStrategy = require('passport-facebook').Strategy;
var config = require('./config');
var User = require('../models/user');

/*
    Create PassportJS Strategies for social authentification
*/
module.exports = function(passport) {

    // method envokes after authentification by req.login(). Attaches passport.user object to a session and req.user
    passport.serializeUser(function(user, done) {
        done(null, user.facebook.id);
    });

    // gets user out of MongoDB and attaches user object to req.user
    passport.deserializeUser(function(id, done) {
        User.findOne({'facebook.id': id}, function(err, user) {
            done(err, user.facebook);
        });
    });

    passport.use(new fbStrategy({
        clientID: config.auth.fb.clientID,
        clientSecret: config.auth.fb.clientSecret,
        callbackURL: config.auth.fb.callbackURL,
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                User.findOne({'facebook.id': profile.id}, function(err, user) {
                    if (err)
                        done(err);
                    if (user)
                        done(null, user);
                    else {
                        var newUser = new User();
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = accessToken;
                        newUser.facebook.name = profile.displayName;
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        })
                    }
                });
            });
        }
    ));
};
