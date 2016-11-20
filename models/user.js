var mongoose = require('mongoose');

// Define schema for Document object
var userSchema = new mongoose.Schema({
    id: String,
    email: String,
    name: String
});

// Create model and export
var User = mongoose.model('user', userSchema);
module.exports = User;
