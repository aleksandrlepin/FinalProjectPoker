const express = require('express')
const app = express();
const http = require('http');
const io = require('socket.io')();
var bodyParser = require('body-parser');
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird');

let url = 'mongodb://admin:123@ds129706.mlab.com:29706/poker';
mongoose.connect(url, { useMongoClient: true });
const db = mongoose.connection;
const Game = require('./models/game');
const config = require("./config.json");
//
var saveGame = require('./routes/saveGame');
// var fetchGame = require('./routes/fetchGame');
var game_id = require('./routes/game_id');
var addPlayer = require('./routes/addPlayer');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var jsonParser = bodyParser.json();



app.use('/saveGame', saveGame);
app.use('/uploadgame', require('./routes/uploadgame'));
app.use('/delgame', require('./routes/delgame'));
// app.use('/fetchGame', fetchGame);
app.use('/addPlayer', addPlayer);
// app.get('/games/');
// app.use('/games/:id', game_id);
app.get('/games/:id/users');
app.get('/games/:id/users/:user_id');
app.get('/games/:id/question/:question_id');




app.get('/games/:id', (req, res, next) => {
    let gameId = req.path.split('/')[2];
    Game.findById(gameId, (err, game) => {
        res.send(game);
    })
})


//socket part

var server = http.createServer(app)
server.listen(config["dev"].port, () => console.log(`Example app listening on port ${config['dev'].port}!`))
io.listen(server);
io.on('connection', (socket) => {
    // console.log('socket connected');
    socket.on('add user', function (username) {

        // we store the username in the socket session for this socket
        console.log('username from server', username)
        socket.username = username;
        socket.emit('login', username);

        socket.broadcast.emit('updateDb', username);
        socket.emit('updateDb', username);

    });

    socket.on('transferNumber', (number) => {
        socket.broadcast.emit('renderNumber', { number: number, name: socket.username })
        socket.emit('renderNumber', { number: number, name: socket.username })
    });

    socket.on('transferQuestion', (index) => {
        socket.broadcast.emit('renderQuestion', { index: index })
        socket.emit('renderQuestion', { index: index })
    })

})
// console.log('listening on port ', port);