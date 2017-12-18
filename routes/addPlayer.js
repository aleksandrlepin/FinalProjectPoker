
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
            console.log('is owner');
            let result = { game, owner: true, username: game.owner.name, useremail: game.owner.email }
            res.send(result);

        } else {
            console.log('not owner')
            let userIsExist = false;
            for (let i = 0; i < game.users.length; i++) {
                if (game.users[i].email === user.email) {
                    userIsExist = true;
                }
            }
            if (userIsExist) {
                let result = { game, owner: false }
                res.send(result);
            } else {
                console.log('enter in else  ')
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