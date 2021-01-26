let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
const {isEmpty} = require('lodash');
const { validateUser } = require('../validators/signup');

exports.show_login = function(req, res, next) {
	res.render('user/login', { formData: {}, errors: {} });
}

exports.show_signup = function(req, res, next) {
	res.render('user/signup', { formData: {}, errors: {} });
}

const rerender_signup = function(errors, req, res, next) {
	res.render('user/signup', { formData: req.body, errors: errors});
}
const generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

exports.signup = function(req, res, next) {
	let errors = {};
	return validateUser(errors, req).then(errors => {
		if (!isEmpty(errors)) {
			rerender_signup(errors, req, res, next);
		} else {
			return models.User.findOne({
				where: {
					is_admin: true
				}
			}).then(user => {
				let newUser;
				if (user !== null) {
					newUser = models.User.build({
						email: req.body.email,
						password: generateHash(req.body.password),
						username: req.body.username,
						firstname: req.body.firstname,
						lastname: req.body.lastname
					});					
				} else {
					newUser = models.User.build({
						email: req.body.email,
						password: generateHash(req.body.password),
						is_admin: true,
						username: req.body.username,
						firstname: req.body.firstname,
						lastname: req.body.lastname
					});
				}
				return newUser.save().then(result => {
					passport.authenticate('local', {
						successRedirect: "/home",
						failureRedirect: "/signup",
						failureFlash: true
					})(req, res, next);
				})	
			})		
		}
	})
}

exports.login = function(req, res, next) { 

	passport.authenticate("local", function(error, user, info) {
		if (error) {
			return res.status(500).json({"success":false});
		}
		if (!user) {
			return res.status(401).json({"success":false});
		}
		req.login(user, function (err) {
			if (err) {
				return res.status(500).json({"success":false});
			} else {
                return res.status(200).json({"success":true,
                });
			}
		});
	})(req, res, next);
 };
exports.logout = function(req, res, next) { 
	req.logout();
	req.session.destroy();
	res.redirect('/login');
}