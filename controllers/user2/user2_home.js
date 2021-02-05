const models = require('../../models')
const {Howl, Howler} = require('howler');
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../../passport_setup')(passport);
let flash = require('connect-flash');
const {isEmpty} = require('lodash');
const { validateUser } = require('../../validators/signup');
exports.user2_show = function(req, res, next) {
	return models.Lead.findAll().then(leads =>{
		   models.Member.findAll().then(user1 =>{
			res.render('user2/user2_home', { title: 'Express',leads: leads,user: req.user,user1:user1 });
			user1.forEach(element => {
				console.log(element);
			} );
		})
		
		// console.log(leads[0].dataValues.email)
		// console.log(user);
		// console.log(leads);
		// console.log(leads.dataValues.length)
		// models.User.findAll().then(user =>{
		// 	user.forEach(element => {
		// 		// console.log(element.firstname);
		// 	} );
		// })
		
		
	})
	
	
}
exports.user2_showsignup = function(req, res, next) {
	res.render('user2/signup_user2', { formData: {}, errors: {} ,user: req.user});
}



const generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

exports.user2_signup = function(req, res, next) {
	let errors = {};
	return validateUser(errors, req).then(errors => {
		if (!isEmpty(errors)) {
			rerender_signup(errors, req, res, next);
		} else {
			return models.Member.findOne({
				where: {
					rank: "Supervisor"
				}
			}).then(user => {
				let newUser;
				if (user !== null) {
					newUser = models.Member.build({
						email: req.body.email,
						password: generateHash(req.body.password),
						firstname: req.body.firstname,
						lastname: req.body.lastname,
						rank: req.body.rank,
						createdby: req.user.email
					});					
				} else {
					newUser = models.Member.build({
						email: req.body.email,
						password: generateHash(req.body.password),
						firstname: req.body.firstname,
						lastname: req.body.lastname,
						rank: req.body.rank,
						createdby: req.user.email
					});
				}
				return newUser.save().then(result => {
					passport.authenticate('local', {
						successRedirect: "/user2_home",
						failureRedirect: "/user2_signup",
						failureFlash: true
					})(req, res, next);
				})	
			})		
		}
	})
}