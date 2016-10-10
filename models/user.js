var mongoose = require('mongoose');

// Define schema for Document object
var userSchema = new mongoose.Schema({
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },

    google: {

    }
});

// Create model and export
var User = mongoose.model('User', userSchema)
module.exports = User;
