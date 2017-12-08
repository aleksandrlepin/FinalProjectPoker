const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const GameSchema = new Schema({
    nameGame: String,
    owner: String,
    description: String,
    questions: {},
    answers: {},
    // currentQuestion: String,
    users: []
});

module.exports = Mongoose.model('Game', GameSchema);