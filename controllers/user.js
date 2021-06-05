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
			return models.Member.findOne({
				where: {
					rank: "Admin"
				}
			}).then(user => {
				let newUser;
				if (user !== null) {
					newUser = models.Member.build({
						email: req.body.email,
						password: generateHash(req.body.password),
						is_admin: true,
						username: req.body.username,
						firstname: req.body.firstname,
						lastname: req.body.lastname,
						rank: req.body.rank,
						createdby: 'ADMIN',
						phonenumber: req.body.phonenumber,
						simnumber:req.body.simnumber,
						place:req.body.place
					});					
				} else {
					newUser = models.Member.build({
						email: req.body.email,
						password: generateHash(req.body.password),
						is_admin: true,
						username: req.body.username,
						firstname: req.body.firstname,
						lastname: req.body.lastname,
						rank: req.body.rank,
						createdby: 'ADMIN',
						phonenumber: req.body.phonenumber,
						simnumber:req.body.simnumber,
						place:req.body.place


					});
				}
				return newUser.save().then(result => {
					passport.authenticate('local', {
						successRedirect: "/login",
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
			return res.status(200).json({"success":false,msg:"email หรือ password ผิดพลาด"});
		}
		if (!user) {
			return res.status(200).json({"success":false,msg:"กรุณากรอก email หรือ password"});
		}
		req.login(user, function (err) {
			if (err) {
				return res.status(200).json({"success":false,msg:"Error!!\n login fail"});
			} else {
				return  models.Showlog.create({
					email: req.body.email,
					rank : req.user.rank,
					place: req.user.place,
					log : 'Log in'
				}).then(function(user){
					console.log('success', user.toJSON());
					res.status(200).json({"success":true});
				})
				.catch(function(err) {
					// print the error details
					console.log(err, req.body.email);
					
				});
			}
		});
	})(req, res, next);
 };
exports.logout = function(req, res, next) { 
	models.Showlog.create({
		email: req.user.email,
		rank : req.user.rank,
		place: req.user.place,
		log : 'Log Out'
	})
	req.logout();
	req.session.destroy();
	res.redirect('/login');
}