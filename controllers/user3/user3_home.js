const models = require('../../models')
const {Howl, Howler} = require('howler');
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../../passport_setup')(passport);
let flash = require('connect-flash');
const {isEmpty} = require('lodash');
const { validateUser } = require('../../validators/signup');
exports.user3_show = function(req, res, next) {
	return models.Lead.findAll().then(leads =>{
		   models.Member.findAll().then(user1 =>{
			res.render('user3/user3_home', { title: 'Express',leads: leads,user: req.user,user1:user1 });
			user1.forEach(element => {
				console.log(element.firstname);
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
const generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
exports.user3_showsignup = function(req, res, next) {
	res.render('user3/signup_user3', { formData: {}, errors: {} });
}

exports.user3_signup = function(req, res, next) {
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
						successRedirect: "/user3_home",
						failureRedirect: "/user3_signup",
						failureFlash: true
					})(req, res, next);
				})	
			})		
		}
	})
}


exports.record_cctv1 = function(req, res, next) {

	const Recorder = require('node-rtsp-recorder').Recorder
	 
		var rec = new Recorder({
			url: 'rtsp://admin:kusrc12345@158.108.122.4:554/stream',
			timeLimit: 60, // time in seconds for each segmented video file
			folder: '/home/guy/myapp/public/video',
			name: "CCTV1"
		})
		// Starts Recording
		rec.startRecording();
	 
		setTimeout(() => {
			console.log('Stopping Recording')
			rec.stopRecording()
			rec = null
			res.render('/user3_home');
		}, 30000)
		res.redirect('/user3_home');
	}