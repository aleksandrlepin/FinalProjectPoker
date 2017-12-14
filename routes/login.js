var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var User = require('../models/user.js')
var userReg = require('../models/userReg.js');
var mongoose = require('mongoose');
let url = 'mongodb://admin:123@ds129706.mlab.com:29706/poker';
mongoose.connect(url, { useMongoClient: true });
const db = mongoose.connection;

var jwt = require('jsonwebtoken');
var socketioJwt = require('socketio-jwt');
var jwtSecret = 'mysecret';

router.post('/', (req, res, next) => {
    let userFromDbName = {},
    userFromDbEmail = {};
    User.find({email: req.body.email}, (err, user) => {
        if (err) {
            console.log(err);
            res.end();
        } 
        else 
        if (user.length > 0) {
            console.log('from else', user)
            userFromDbName = user[0].name;
            userFromDbEmail = user[0].email;
            var token = jwt.sign(req.body, jwtSecret, { expiresIn: 60 * 1 });
            res.json({ token: token, name: userFromDbName, email: userFromDbEmail });
        } else {
            res.end();
        }
       
    }) 
});

module.exports = router;