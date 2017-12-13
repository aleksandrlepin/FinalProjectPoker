var express = require('express');
var router = express.Router();
var newuser = require('../models/user')
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var md5 = require('md5');

mongoose.connect('mongodb://admin:123@ds129706.mlab.com:29706/poker', function (err) {
	if (err) throw err;
	console.log('Successfully connected');
});



// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
/* GET home page. */
router.post('/registerUser', function(req, res, next) {

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
	validate();

	var ret = {};
	MongoClient.connect("mongodb://admin:123@ds129706.mlab.com:29706/poker", function(err, db) {
		if (err) throw err;

		db.collection('users', (err, collection) => {
			if (err) throw err;

			var badLogin = false;
			var badEmail = false;
			collection.find().toArray(function(err, items) {
				if (err) throw err;

				for (let i=0; i<items.length; i++) {
					if (req.body.login === items[i].login) {
						badLogin = true;
					}

					if (req.body.email.toLowerCase() === items[i].email || validate() === false) {
						badEmail = true;
					}
				}

				// console.log('badLogin', badLogin);
				// console.log('badEmail', badEmail);

				if (!badLogin && !badEmail) {
					adduser();
					ret = {badLogin: badLogin, badEmail: badEmail};
					res.send(ret)
				} else {
					// write out
					ret = {badLogin: badLogin, badEmail: badEmail};
					res.send(ret)
				}
			});
		})
	})
	

	function adduser() {
		let userObj = {
			login: req.body.login,
			email: req.body.email.toLowerCase(),
			password: md5(req.body.password),
		}

		let user = mongoose.model('users', newuser);
		let adduser = new user(userObj);
		adduser.save(function(err) {
			if (err) throw err;
			console.log('User successfully saved.');
		});
	}
});

module.exports = router;
