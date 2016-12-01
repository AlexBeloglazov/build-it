module.exports = {

    session: {
        secret: process.env.NODE_SESSION_KEY || 'nisuhg93nxkw02snw01n',
        resave: false,
        saveUninitialized: false
    },

    db: { url: process.env.MONGODB_URI || 'mongodb://localhost:27017/buildit'},

    auth: {

        fb: {
            'clientID': process.env.FACEBOOK_CLIENTID || 1828026720807214,
            'clientSecret': process.env.FACEBOOK_SECRET,
            'callbackURL': process.env.FACEBOOK_CALLBACK || 'http://localhost:3000/auth/facebook/callback'
        },

        google: {
            'clientID': process.env.GOOGLE_CLIENTID || '488115527391-hn8rp7bo07js8p567t5v0i5r9mi7v2g9.apps.googleusercontent.com',
            'clientSecret': process.env.GOOGLE_SECRET,
            'callbackURL': process.env.GOOGLE_CALLBACK || 'http://localhost:3000/auth/google/callback'
        }
    }
};
