
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
    console.log(req.body)
    // let user = req.body.user;
    let gameId = req.body.gameId;
    var newPlayers = []
    Game.findById(gameId, (err, game) => {
        for (let i = 0; i < game.users.length; i++) {
            if (game.users[i].email === game.owner.email) {
                newPlayers.push(game.users[i]);
                console.log(newPlayers)
            }
        }
        Game.findByIdAndUpdate(gameId, { $set: { users: newPlayers } }, { new: true }, function (err, game) {
            if (err) return handleError(err);
            let result = { game, owner: true }
            res.send(game);
        });

    })
})


module.exports = router;