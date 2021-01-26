let models = require("../../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../../passport_setup')(passport);
let flash = require('connect-flash');
const {isEmpty} = require('lodash');
const { validateUser } = require('../../validators/signup');


exports.data_person = function(req, res, next) {
	return models.Lead.findAll().then(leads =>{
		var data = [];
		leads.forEach(element => {
			data.push(element.email);
			// console.log(element.email);
		} );
		// return res.status(200).json({'msg':data});
		return res.status(200).json(leads[1].dataValues);
		// let x = leads[0].dataValues.email;
		//console.log(leads[0].dataValues.email);
		// return res.status(200).json({'msg':x});
	})
	
}
exports.check_login = function(req, res, next) {
	return models.User.findAll().then(user =>{
		var data = [];
		user.forEach(element => {
			data.push(element.email);
			// console.log(element.email);
		} );
		// return res.status(200).json({'msg':data});
		return res.status(200).json(data);
		// let x = leads[0].dataValues.email;
		//console.log(leads[0].dataValues.email);
		// return res.status(200).json({'msg':x});
	})
	
}
exports.login = function(req, res, next) { 

	passport.authenticate("local", function(error, user, info) {
		if (error) {
			return res.status(500).json({"success":"false"});
		}
		if (!user) {
			return res.status(401).json({"success":"false"});
		}
		req.login(user, function (err) {
			if (err) {
				return res.status(500).json({"success":"false"});
			} else {
                return res.status(200).json({"success":"sucess",
                    userinfo:user
                });
			}
		});
	})(req, res, next);
 };