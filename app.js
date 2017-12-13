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
    console.log('token from mdw req.body', req.body.token.toString());
    var token = req.body.token;
    jwt.verify(req.body.token.toString(), jwtSecret, function(err, decoded) {
        console.log(decoded);
         res.json(decoded);
         next();
      });
    // // var token = req.body.token.toString() || req.query.token || req.headers['x-access-token'];
    //   if (true) {
           
    //     jwt.verify(token, jwtSecret, function(err, decoded) {
    //         // if (err) {
    //         //     return res.json({ success: false, message: 'Failed to authenticate token.' });
    //         //     // next(err, req, res)
    //         // } else {
    //         //     console.log(decoded);
    //         //     req.token = decoded;

    //         //      res.json(decoded);
    //         //      next(req, res);
    //         // }
    //         console.log('decoded', decoded);
    //       });
          
    //   }
    // next(req, res);
    
}


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




app.post('/games/:id', (req, res, next) => {
    console.log('from post game id', req.path.split('/')[2]);
    let gameId = req.path.split('/')[2];
    Game.findById(gameId, (err, game) => {
        res.send(game);
    })
})


//token part

app.post('/login', (req, res, next) => {
    let userFromDb = {};
    console.log('req.body.email', req.body.email)
    User.find({email: req.body.email}, (err, user) => {
        if (err) console.log(err);
        userFromDb = user[0].name;
        console.log('user from db', userFromDb)
        var token = jwt.sign(req.body, jwtSecret, { expiresIn: 60 * 5 });
        res.json({ token: token, name: userFromDb });
    })
   

    //check db and take usersdata from db
   
});

app.post('/auth', (req, res, next) => {
        console.log('token from LC', req.body.token.toString())
       
        jwt.verify(req.body.token.toString(), jwtSecret, function(err, decoded) {
            console.log(decoded);
             res.json(decoded);
          });
    });


//socket part

var server = http.createServer(app)
server.listen(config["dev"].port, () => console.log(`Example app listening on port ${config['dev'].port}!`))
io.listen(server);

// io.set('authorization', socketioJwt.authorize({
//     secret: jwtSecret,
//     handshake: true
//   }));


//   io.sockets
//   .on('connection', function (socket) {
//      console.log(socket.handshake.decoded_token.email, 'connected');
//      //socket.on('event');
//   });

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