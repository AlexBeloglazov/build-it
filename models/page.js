var mongoose = require('mongoose');

var webPageSchema = new mongoose.Schema({
    user: String,
    html: String,
    nextid: Number,
});

module.exports = mongoose.model('webpage', webPageSchema);
