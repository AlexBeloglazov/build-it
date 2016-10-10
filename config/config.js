module.exports = {

    session: {
        secret: process.env.SESSION_KEY || 'nisuhg93nxkw02snw01n',
        resave: false,
        saveUninitialized: true
    },

    db: { url: 'mongodb://localhost:27017/buildit'},

    auth: {

        fb: {
            'clientID': 0,
            'clientSecret': 0,
            'callbackURL': ''
        },

        google: {
            'clientID': 0,
            'clientSecret': 0,
            'callbackURL': ''
        }
    }
};
