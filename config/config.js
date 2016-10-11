module.exports = {

    session: {
        secret: process.env.NODE_SESSION_KEY || 'nisuhg93nxkw02snw01n',
        resave: false,
        saveUninitialized: true
    },

    db: { url: 'mongodb://localhost:27017/buildit'},

    auth: {

        fb: {
            'clientID': 1799987136944506,
            'clientSecret': process.env.FACEBOOK_SECRET,
            'callbackURL': 'http://localhost:3000/auth/facebook/callback'
        },

        google: {
            'clientID': 0,
            'clientSecret': '',
            'callbackURL': ''
        }
    }
};
