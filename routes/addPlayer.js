
var express = require('express');
var router = express.Router();
// const app = express();


let url = 'mongodb://admin:123@ds129706.mlab.com:29706/poker';
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird');

mongoose.connect(url, { useMongoClient: true });
const db = mongoose.connection;
const Game = require('../models/game');

router.post('/', (req, res, next) => {
    let user = req.body.user;
    let gameId = req.body.gameId;
    Game.findByIdAndUpdate(gameId, { $push: { users: user }}, { new: true }, function (err, game) {
        if (err) return handleError(err);
        // console.log('result', err, game)
        res.send(game);
      });
})

module.exports = router;