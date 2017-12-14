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

let url = 'mongodb://admin:123@ds129706.mlab.com:29706/poker';
mongoose.connect(url, { useMongoClient: true });
const db = mongoose.connection;
const Game = require('./models/game');
const User = require('./models/user');
const config = require("./config.json");
//
var saveGame = require('./routes/saveGame');
// var fetchGame = require('./routes/fetchGame');
// var game_id = require('./routes/game_id');
var addPlayer = require('./routes/addPlayer');

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
    console.log('token from mdw req.body', req.body);
    var token = req.body.token;
    if (token) {
        jwt.verify(token, jwtSecret, function(err, decoded) {
            console.log('err', err, 'decoded', decoded);
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'})
            } else {
                console.log(decoded);
                req.token = decoded;
                next();
            }
          });
    } else next();
    
}


app.use('/saveGame', saveGame);
app.use('/uploadGamesByOwner', require('./routes/uploadgame'));
app.use('/delgame', require('./routes/delgame'));
// app.use('/fetchGame', fetchGame);
app.use('/addPlayer', addPlayer);
app.use(logErrors)
// app.get('/games/');
// app.use('/games/:id', game_id);
// app.get('/games/:id/users');
// app.get('/games/:id/users/:user_id');
// app.get('/games/:id/question/:question_id');



// app.get('/games/:id', (req, res, next) => {
//     console.log('from get game id', req.path.split('/')[2]);
//     let gameId = req.path.split('/')[2];
//     Game.findById(gameId, (err, game) => {
//         console.log('game', game);
//         res.send(game);
//     })
// })

app.post('/games/:id', verifyToken, (req, res, next) => {
    console.log('from post game id', req.path.split('/')[2]);
    console.log('req.body from post', req.body)
    let gameId = req.path.split('/')[2];
    Game.findById(gameId, (err, game) => {
        // console.log('game', game);
        res.send(game);
    })
})


//token part

app.post('/login', (req, res, next) => {
    let userFromDbName = {},
    userFromDbEmail = {};
    // console.log('req.body.email', req.body.email)
    User.find({email: req.body.email}, (err, user) => {
        if (err) console.log(err);
        userFromDbName = user[0].name;
        userFromDbEmail = user[0].email;
        // console.log('user from db', userFromDbName, userFromDbEmail)
        var token = jwt.sign(req.body, jwtSecret, { expiresIn: 60 * 30 });
        res.json({ token: token, name: userFromDbName, email: userFromDbEmail });
    })
   

    //check db and take usersdata from db
   
});



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
    socket.on('add owner', function (username) {
        console.log('ownername from server', username)
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

})

function logErrors (err, req, res, next) {
    console.error(err.stack)
    next(err)
  }
// console.log('listening on port ', port);