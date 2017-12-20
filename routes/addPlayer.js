
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
    Game.findById(gameId, (err, game) => {

        if (game.owner.email == user.email) {
            let result = { game, owner: true, username: game.owner.name, useremail: game.owner.email }
            res.send(result);

        } else {
            let userIsExist = false;
            for (let i = 0; i < game.users.length; i++) {
                if (game.users[i].email === user.email) {
                    var players = game.users;
                    for (let i = 0; i < players.length; i++) {
                        if (players[i].email === user.email) {
                            players[i].name = user.name
                        }
                    }
                    Game.findByIdAndUpdate(gameId, { $set: { users: players } }, { new: true }, function (err, game) {
                        if (err) return handleError(err);
                        let result = { game, owner: false }
                        res.send(result);
                    });
                    userIsExist = true;
                }
            }
            if (!userIsExist) {
                Game.findByIdAndUpdate(gameId, { $push: { users: user } }, { new: true }, function (err, game) {
                    if (err) return handleError(err);
                    let result = { game, owner: false }
                    res.send(result);
                });
            }
        }
    })

})

module.exports = router;