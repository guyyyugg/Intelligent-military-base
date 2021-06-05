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
	return models.Place.findAll().then(data_place =>{
		res.render('user2/user2_signup', { formData: {}, errors: {},user: req.user,data_place:data_place });
		console.log(data)
	})	
}
exports.user2_showlog = function(req, res, next) {
	
	return models.Showlog.findAll({
		where : {
			rank : ['Leader','Soldier'],
			place : req.user.dataValues.place
		}
	}).then(data =>{
		models.Place.findAll().then(data_place =>{
		res.render('user2/user2_showlog', { title: 'Express',data:data,user: req.user ,data_place:data_place });	
		console.log(data)
	})
})
}
exports.user2_showemail = function(req, res, next) {
	
	return models.Member.findAll({
		where : {
			rank : ['Leader','Soldier'],
			place : req.user.dataValues.place
		}
	}).then(data =>{
		models.Place.findAll().then(data_place =>{
			console.log(data)
			res.render('user2/user2_showemail', { title: 'Express',data:data,user: req.user ,data_place:data_place });		
		//console.log(data_place)
		})
	})	
}


exports.user2_adddevice = function(req, res, next) {
	return models.Member.findAll().then(data =>{
		models.Place.findAll().then(data_place =>{
			res.render('user2/user2_adddevice', { title: 'Express',data:data,user: req.user,data_place:data_place  });	
	})	
	})
}
exports.user2_addcamera = function(req, res, next) {
	return models.Member.findAll().then(data =>{
		models.Place.findAll().then(data_place =>{
			res.render('user2/user2_addcamera', { title: 'Express',data:data,user: req.user ,data_place:data_place });	
	})	
})
}

const rerender_signup = function(errors, req, res, next) {
	return models.Place.findAll().then(data =>{
	res.render('user2/user2_signup', { formData: req.body, errors: errors,user: req.user,data:data});
	//console.log(errors)
})	
}


const generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

exports.user2_signup = function(req, res, next) {
	console.log(req.body.rank)
	let errors = {};
	return validateUser(errors, req).then(errors => {
		if (!isEmpty(errors)) {
			rerender_signup(errors, req, res, next);
		} else {
			return models.Member.findOne({
				where: {
					rank: "Leader"
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
						createdby: req.user.email,
						phonenumber: req.body.phonenumber,
						simnumber: req.body.simnumber,
						place: req.body.place,
					});					
				} else {
					newUser = models.Member.build({
						email: req.body.email,
						password: generateHash(req.body.password),
						firstname: req.body.firstname,
						lastname: req.body.lastname,
						rank: req.body.rank,
						createdby: req.user.email,
						phonenumber: req.body.phonenumber,
						simnumber: req.body.simnumber,
						place: req.body.place,
					});
				}
				return newUser.save().then(result => {
					models.Showlog.create({
						email: req.user.email,
						rank : req.user.rank,
						place: req.user.place,
						log : 'Sign Up'
					})
					res.redirect("/user2_showemail?success=true");
					// passport.authenticate('local', {
					// 	successRedirect: "/user2_home",
					// 	failureRedirect: "/user2_signup",
					// 	failureFlash: true
					// })(req, res, next);
				})	
			})		
		}
	})
}

exports.user2_adddevice_add = function(req, res, next) {

	var device_eui = req.body.device_eui;
	var position = req.body.position;
	var latitude = req.body.latitude;
	var longitude = req.body.longitude;

	if(isEmpty(device_eui)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter device eui"});
	}
	if(isEmpty(latitude)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter latitude"});
	}
	if(isEmpty(longitude)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter longitude"});
	}
	if(isEmpty(position)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter position"});
	}

	return models.Device.create({
		email : req.body.email,
		rank : req.body.rank,
		device_eui : req.body.device_eui,
		place : req.body.place,
		position : req.body.position,
		latitude : req.body.latitude,
		longitude : req.body.longitude,
		status : 0,

	}).then(lead => {
		models.Showlog.create({
			email: req.user.email,
			rank : req.user.rank,
			place: req.user.place,
			log : 'ADD Device'
		})
		res.status(200).json({success:true});
	}).catch(e=>{
		return res.status(200).json({success:false,msg:"Error!!\n  "});
	})
}



exports.user2_showdevice = function(req, res, next) {
	return models.Device.findAll(
		{
			where: {
				place:	req.user.dataValues.place
			}
		}
	).then(data =>{
		models.Place.findAll().then(data_place =>{
			res.render('user2/user2_showdevice', { title: 'Express',data:data,user: req.user ,data_place:data_place });	
	})	
	})
}

exports.user2_editdevice = function(req, res, next) {
	return models.Device.findOne({
		where : {
			id : req.params.data_id
		}
	}).then(data =>{
		models.Place.findAll().then(data_place =>{
		res.render('user2/user2_editdevice', { title: 'Express', data:data,user: req.user,data_place:data_place });	
		//console.log(data.email)
	})
	})
}

exports.edit_device = function(req, res, next) {
	var device_eui = req.body.device_eui
	var position = req.body.position
	var latitude = req.body.latitude
	var longitude = req.body.longitude
	if(isEmpty(device_eui)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter device_eui"});
	}
	if(isEmpty(position)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter position"});
	}
	if(isEmpty(latitude)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter latitude"});
	}
	if(isEmpty(longitude)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter longitude"});
	}
	//console.log(req.body.id)
	return models.Device.update({
		email : req.body.email,
		rank : req.body.rank,
		device_eui : req.body.device_eui,
		place : req.body.place,
		position : req.body.position,
		latitude : req.body.latitude,
		longitude : req.body.longitude,
	},{
		where:{
			id : req.body.id
		}
	}).then(result => {
		models.Showlog.create({
			email: req.user.email,
			rank : req.user.rank,
			place: req.user.place,
			log : 'EDIT Device'
		})
		res.status(200).json({success:true});
	}).catch(e=>{
		return res.status(200).json({success:false,msg:"Error!!\n  "});
	})
}

exports.delete_device = function(req, res, next) {
	return models.Device.destroy({
		where: {
			id: req.body.id
		}
	}).then(result => {
		models.Showlog.create({
			email: req.user.email,
			rank : req.user.rank,
			place: req.user.place,
			log : 'Delete Device'
		})
		res.status(200).json({success:true});
	}).catch(e=>{
		return res.status(200).json({success:false,msg:"Error!!\n  "});
	})
}

exports.edit_device_status = function(req, res, next) {
	return models.Device.update({
		status : req.body.status,
	},{
		where:{
			id : req.body.id
		}
	}).then(result => {
		models.Showlog.create({
			email: req.user.email,
			rank : req.user.rank,
			place: req.user.place,
			log : 'ON/OFF Device'
		})
		res.status(200).json({success:true});
	}).catch(e=>{
		return res.status(200).json({success:false,msg:"Error!!\n  "});
	})
}








exports.user2_addcamera_add = function(req, res, next) {
	var name = req.body.name
	var ip_port = req.body.ip_port
	var user = req.body.user
	var password = req.body.password
	var position = req.body.position
	var latitude = req.body.latitude
	var longitude = req.body.longitude
	if(isEmpty(name)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter name"});
	}
	if(isEmpty(ip_port)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter ip_port"});
	}
	if(isEmpty(user)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter user"});
	}
	if(isEmpty(password)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter password"});
	}
	if(isEmpty(position)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter position"});
	}
	if(isEmpty(latitude)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter latitude"});
	}
	if(isEmpty(longitude)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter longitude"});
	}
	return models.Cctv.create({
		email : req.body.email,
		name : req.body.name,
		ip_port : req.body.ip_port,
		user : req.body.user,
		password : req.body.password,
		position : req.body.position,
		latitude : req.body.latitude,
		longitude : req.body.longitude,
		rank : req.body.rank,
		place : req.body.place,
		status : 0,

	}).then(lead => {
		models.Showlog.create({
			email: req.user.email,
			rank : req.user.rank,
			place: req.user.place,
			log : 'ADD Camera'
		})
		res.status(200).json({success:true});
	}).catch(e=>{
		return res.status(200).json({success:false,msg:"Error!!\n  "});
	})	
}

exports.user2_edit_cctv = function(req, res, next) {
	return models.Cctv.findOne({
		where : {
			id : req.params.data_id
		}
	}).then(data =>{
		models.Place.findAll().then(data_place =>{
		console.log(data)
		res.render('user2/user2_edit_cctv', { title: 'Express', data:data,user: req.user,data_place:data_place });	
		//console.log(data.email)
	})
	})
}

exports.user2_edit_cctv_update = function(req, res, next) {
	var name = req.body.name
	var ip_port = req.body.ip_port
	var user = req.body.user
	var password = req.body.password
	var position = req.body.position
	var latitude = req.body.latitude
	var longitude = req.body.longitude
	if(isEmpty(name)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter name"});
	}
	if(isEmpty(ip_port)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter ip_port"});
	}
	if(isEmpty(user)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter user"});
	}
	if(isEmpty(password)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter password"});
	}
	if(isEmpty(position)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter position"});
	}
	if(isEmpty(latitude)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter latitude"});
	}
	if(isEmpty(longitude)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter longitude"});
	}
	return models.Cctv.update({
		email : req.body.email,
		name : req.body.name,
		ip_port : req.body.ip_port,
		user : req.body.user,
		password : req.body.password,
		position : req.body.position,
		latitude : req.body.latitude,
		longitude : req.body.longitude,
		rank : req.body.rank,
		place : req.body.place,
	},{
		where:{
			id : req.body.id
		}
	}).then(result => {
		models.Showlog.create({
			email: req.user.email,
			rank : req.user.rank,
			place: req.user.place,
			log : 'EDIT Camera'
		})
		res.status(200).json({success:true});
	}).catch(e=>{
		return res.status(200).json({success:false,msg:"Error!!\n  "});
	})
}


exports.delete_cctv = function(req, res, next) {
	return models.Cctv.destroy({
		where: {
			id: req.body.id
		}
	}).then(result => {
		models.Showlog.create({
			email: req.user.email,
			rank : req.user.rank,
			place: req.user.place,
			log : 'Delete Camera'
		})
		res.status(200).json({success:true});
	}).catch(e=>{
		return res.status(200).json({success:false,msg:"Error!!\n  "});
	})
}


exports.user2_cctv_status = function(req, res, next) {
	return models.Cctv.update({
		status : req.body.status,
	},{
		where:{
			id : req.body.id
		}
	}).then(result => {
		models.Showlog.create({
			email: req.user.email,
			rank : req.user.rank,
			place: req.user.place,
			log : 'ON/OFF Camera'
		})
		res.status(200).json({success:true});
	}).catch(e=>{
		return res.status(200).json({success:"false",msg:"Error!!\n  "});
	})
}