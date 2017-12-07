var express = require('express');
var router = express.Router();
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var jsonParser = bodyParser.json();

let url = 'mongodb://admin:123@ds129706.mlab.com:29706/poker';
// var MongoClient = require('mongodb').MongoClient;
// var ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird');

mongoose.connect(url, { useMongoClient: true });
const db = mongoose.connection;
db.on('error', err => {
    console.log('error', err)
})
const Game = require('../models/game');

router.post('/', (req, res, next) => {

    console.log(req.body)
   
    const newGame = new Game(req.body);
    console.log('game', newGame)
    newGame.save((err, game) => {
        if (err) {
            console.log('err', err)
        }
        console.log('saved game', game)
    })
    res.send('from save game')

})

module.exports = router;