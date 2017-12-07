const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const GameSchema = new Schema({
    name: String,
    owner: String,
    questions: {},
    answers: {},
    currentQuestion: String,
    users: []
})

module.exports = Mongoose.model('Game', GameSchema);