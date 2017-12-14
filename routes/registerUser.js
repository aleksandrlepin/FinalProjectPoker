var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var md5 = require('md5');

var User = require('../models/user.js')
var userReg = require('../models/userReg.js');
var mongoose = require('mongoose');
let url = 'mongodb://admin:123@ds129706.mlab.com:29706/poker';
mongoose.connect(url, { useMongoClient: true });
const db = mongoose.connection;


router.post('/', function(req, res, next) {

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
		User.find({name: req.body.name}, (err, name) => {
	    	if (err) console.log(err);
	    	if (!name.length) {
	    		User.find({email: req.body.email}, (err, email) => {
	    			if (err) console.log(err);
	    			if (!email.length) {
	    				adduser();
	    			}
				})
	    	} 
	    })
	}


	function adduser() {
		console.log('start add')
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