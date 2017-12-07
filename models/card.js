const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const CardSchema = new Schema({
    value: Number,
    userName: String,
    question: Number
})

module.exports = Mongoose.model('Card', CardSchema);