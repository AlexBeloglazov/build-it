var mongoose = require('mongoose');

var webPageSchema = new mongoose.Schema({
    user: String,
    html: String,
});

module.exports = mongoose.model('webpage', webPageSchema);
