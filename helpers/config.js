module.exports = {

    session: {
        secret: process.env.NODE_SESSION_KEY || 'nisuhg93nxkw02snw01n',
        resave: false,
        saveUninitialized: false
    },

    db: { url: 'mongodb://localhost:27017/buildit'},

    auth: {

        fb: {
            'clientID': 1799987136944506,
            'clientSecret': process.env.FACEBOOK_SECRET,
            'callbackURL': 'http://localhost:3000/auth/facebook/callback'
        },

        google: {
            'clientID': '488115527391-hn8rp7bo07js8p567t5v0i5r9mi7v2g9.apps.googleusercontent.com',
            'clientSecret': process.env.GOOGLE_SECRET,
            'callbackURL': 'http://localhost:3000/auth/google/callback'
        }
    }
};
