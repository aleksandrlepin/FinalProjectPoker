const express = require('express')
const app = express();
const http = require('http');
const io = require('socket.io')();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

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

app.use('/login', require('./routes/login'));
app.use('/saveGame', require('./routes/saveGame'));
app.use('/uploadGamesByOwner', verifyToken, require('./routes/uploadgame'));
app.use('/delgame', require('./routes/delgame'));
app.use('/registerUser', require('./routes/registerUser.js'));
app.use('/addPlayer', require('./routes/addPlayer'));
app.use('/games', verifyToken, require('./routes/game_id'));
app.use(logErrors)
// app.get('/games/:id/users');
// app.get('/games/:id/users/:user_id');
// app.get('/games/:id/question/:question_id');

//socket part

var server = http.createServer(app)
server.listen(config["dev"].port, () => console.log(`Example app listening on port ${config['dev'].port}!`))
io.listen(server);

io.on('connection', (socket) => {
    socket.on('add user', function (username) {

        // we store the username in the socket session for this socket
        socket.username = username;
        socket.emit('login', username);

        socket.broadcast.emit('updateDb', username);
        socket.emit('updateDb', username);

    });
    socket.on('add owner', function (username) {
        socket.username = username;
        socket.broadcast.emit('updateDb', username);
        socket.emit('updateDb', username);
    })

    socket.on('transferNumber', (number) => {
        socket.broadcast.emit('renderNumber', { number: number, name: socket.username })
        socket.emit('renderNumber', { number: number, name: socket.username })
    });

    socket.on('transferQuestion', (index) => {
        socket.broadcast.emit('renderQuestion', { index: index })
        socket.emit('renderQuestion', { index: index })
    })

    socket.on('renderAverage', function(y) {
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
  
