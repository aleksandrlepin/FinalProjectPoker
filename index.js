const express = require('express')
const app = express();
const http = require('http');
const io = require('socket.io')();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const path = require('path');

const PORT = process.env.PORT || 3001

var jwt = require('jsonwebtoken');
var socketioJwt = require('socketio-jwt');
var jwtSecret = 'mysecret';

const config = require("./config.json");

// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname, 'poker/build')));

let verifyToken = (req, res, next) => {
    // console.log('token from mdw req.body', req.body);
    var token = req.body.token;
    if (token) {
        jwt.verify(token, jwtSecret, function(err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'})
            } else {
                req.token = decoded;
                next();
            }
          });
    }
     else next();    
}
module.exports = verifyToken;

app.get('/', (req, res) => {
    console.log(__dirname + '/poker/build/index.html');
    res.sendFile(path.join(__dirname, 'poker/build/index.html'));
    // res.send('/poker/build/index.html')
})

app.use('/login', require('./routes/login'));
app.use('/saveGame', require('./routes/saveGame'));
app.use('/uploadGamesByOwner', verifyToken, require('./routes/uploadgame'));
app.use('/delgame', require('./routes/delgame'));
app.use('/registerUser', require('./routes/registerUser.js'));
app.use('/addPlayer', require('./routes/addPlayer'));
app.use('/games', verifyToken, require('./routes/game_id'));
app.use('/endGame', require('./routes/endGame'));
app.use('/clearPlayers', require('./routes/clearPlayers'));
app.use(logErrors)
// app.get('/games/:id/users');
// app.get('/games/:id/users/:user_id');
// app.get('/games/:id/question/:question_id');

//socket part


var server = http.createServer(app)
server.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
// server.listen(config["dev"].port, () => console.log(`Example app listening on port ${config['dev'].port}!`))
io.listen(server);

io.on('connection', (socket) => {
    socket.on('add user', function (player) {

        // we store the username in the socket session for this socket
        socket.username = player.name;
        socket.email = player.email;
        socket.emit('login', player.name);

        socket.broadcast.emit('updateDb', player.name);
        socket.emit('updateDb', player.name);

    });
    socket.on('add owner', function (player) {
        socket.username = player.name;
        socket.email = player.email;
        socket.broadcast.emit('updateDb', player.name);
        socket.emit('updateDb', player.name);
    })

    socket.on('clearPlayers', function() {
        socket.broadcast.emit('updateDb');
    })

    socket.on('resetCards', function() {
        socket.broadcast.emit('clearCards');
        socket.emit('clearCards');
    } )
    
    socket.on('transferNumber', (number) => {
        console.log('server transfer Number socket.username', number, socket.username)
        //on in UserCard component to change view and save to store
        socket.broadcast.emit('renderNumber', { number: number, name: socket.username, email: socket.email })
        socket.emit('renderNumber', { number: number, name: socket.username, email: socket.email })
    });

    socket.on('transferQuestion', (index) => {
        console.log('question number', index)
        socket.broadcast.emit('renderQuestion', { index: index })
        socket.emit('renderQuestion', { index: index })
    })

    socket.on('renderAverage', function(y) {
        console.log('0 from render average', y)
        socket.emit('changeAverageInDb', y);
        socket.broadcast.emit('changeAverageInDb', y);
    })

})

function logErrors (err, req, res, next) {
    if(err){
        console.error(err.stack);
        res.status(500).json({

        })
    }
  }

module.exports = verifyToken;
  
