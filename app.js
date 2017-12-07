const express = require('express')
const app = express();
const http = require('http');
const io = require('socket.io')();
var bodyParser = require('body-parser');
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird');

var saveGame = require('./routes/saveGame');
var fetchGame = require('./routes/fetchGame');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var jsonParser = bodyParser.json();

let url = 'mongodb://admin:123@ds129706.mlab.com:29706/poker';
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

app.use('/saveGame', saveGame);
app.use('/fetchGame', fetchGame);



var server = http.createServer(app)
server.listen(3001, () => console.log('Example app listening on port 3001!'))
io.listen(server);
io.on('connection', (socket) => {
    console.log('socket connected');
})
// console.log('listening on port ', port);