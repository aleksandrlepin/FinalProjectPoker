var mongoose = require('mongoose');

var newuser = mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

module.exports = newuser 