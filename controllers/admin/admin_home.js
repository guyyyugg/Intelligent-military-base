const models = require('../../models')
const {Howl, Howler} = require('howler');
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../../passport_setup')(passport);
let flash = require('connect-flash');
const {isEmpty} = require('lodash');
const { validateUser } = require('../../validators/signup');
exports.admin_show = function(req, res, next) {
	return models.Lead.findAll().then(leads =>{
		   models.Member.findAll().then(user1 =>{
			res.render('admin/admin_home', { title: 'Express',leads: leads,user: req.user,user1:user1 });
			user1.forEach(element => {
				// console.log(element);
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
exports.submit_data = function(req, res, next) {
	return models.Lead.create({
		email: req.body.data_email
	}).then(lead => {
		res.redirect('/admin_home');
	})
}
exports.check_data = function(req, res, next) {
	return models.Lead.findAll().then( leads =>{
		
		// console.log(leads[0].dataValues.email)
		var z=0;
		var i=0
		var sum=0;
		leads.forEach(element => {
			z++;
			console.log(element.email);
		} );
		for(i=0 ;i<z;i++){
			if(req.body.email == leads[i].dataValues.email){
				console.log('hellow success')
				sum=1;
				i=z+10;
				return res.status(200).json({msg:"data have in database"});
			}		
		}
		if(sum!=1){
			console.log('else not success')
			return res.status(404).json({msg:"Found a bad person."});
		}
	})
}

exports.delete_data = function(req, res, next) {
	return models.Lead.destroy({
		where: {
			id: req.params.data_id
		}
	}).then(result => {
		res.redirect('/admin_home')
	})
}
exports.delete_email = function(req, res, next) {
	return models.Member.destroy({
		where: {
			id: req.params.data_id
		}
	}).then(result => {
		res.redirect('/admin_home')
	})
}

const generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

exports.admin_showsignup = function(req, res, next) {
	res.render('admin/admin_signup', { formData: {}, errors: {},user: req.user });
}
exports.admin_signup = function(req, res, next) {
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
						successRedirect: "/admin_home",
						failureRedirect: "/admin_signup",
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
			res.render('/admin_home');
		}, 30000)
		res.redirect('/admin_home');
	}



