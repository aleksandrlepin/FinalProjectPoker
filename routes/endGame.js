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
	console.log('post', req.body)

	Game.remove({ _id: req.body._id }, function(err) {
    if (!err) {
            console.log('notification!');
    }
    else {
            console.log('error');
    }
    const newGame = new Game(req.body);
    newGame.save((err, game) => {
        if (err) {
            console.log('err', err)
        }
    })
    console.log('game saved')
});

// 	Game.findOneAndUpdate(req.body, req.body, {upsert:true}, function(err, doc){
//     if (err) return res.send(500, { error: err });
//     return res.send("succesfully saved");
// });
	// console.log('game came', req.body)
 //    const newGame = new Game(req.body);
 //    newGame.save((err, game) => {
 //        if (err) {
 //            console.log('err', err)
 //        }
 //    })
})

module.exports = router;