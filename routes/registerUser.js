var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var md5 = require('md5');


var jwt = require('jsonwebtoken');
var socketioJwt = require('socketio-jwt');
var jwtSecret = 'mysecret';

var User = require('../models/user.js')
var userReg = require('../models/userReg.js');
var mongoose = require('mongoose');
let url = 'mongodb://admin:123@ds129706.mlab.com:29706/poker';
mongoose.connect(url, { useMongoClient: true });
const db = mongoose.connection;


router.post('/', function(req, res, next) {
	let respons = { emailValRes : false, nameRes : false, emailRes : false, addedToDb : false, token : '', name : '', email : '', isOwner : true };
	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
		
	}

	function validate() {
		var email = req.body.email;
		if (!validateEmail(email)) {
			return false;
		} else {
			return true;
		}
	}


	if (validate()) {
		respons.emailValRes = true;
	}

	User.find({name: req.body.name}, (err, name) => {
		if (err) console.log(err);

		if (!name.length) {
			respons.nameRes = true;
		}

		User.find({email: req.body.email}, (err, email) => {
			if (err) console.log(err);

			if (!email.length) {
				respons.emailRes = true;
				respons.addedToDb = true;
			}

			if (respons.emailValRes && respons.nameRes && respons.emailRes) {
				adduser();
				respons.name = req.body.name;
				respons.email = req.body.email;
				var token = jwt.sign(req.body, jwtSecret, { expiresIn: 60 * 30 });
				respons.token = token;
				res.send(JSON.stringify(respons));
			} else {
				res.send(JSON.stringify(respons));
			}
		})
	})
	

	function adduser() {
		console.log('start add')
		console.log(respons)
		let userObj = {
			name: req.body.name,
			email: req.body.email.toLowerCase(),
			password: md5(req.body.password),
		}
		let user = mongoose.model('user', userReg);
		let adduser = new user(userObj);
		adduser.save(function(err) {
			if (err) throw err;
		});
	}
});

module.exports = router;
