const models = require('../../models')
const {Howl, Howler} = require('howler');
var player = require('play-sound')(opts = {})
const {isEmpty} = require('lodash');
exports.user1_show = function(req, res, next) {
	return models.Lead.findAll().then(leads =>{
		   models.Member.findAll().then(user1 =>{
			res.render('user1/user1_home', { title: 'Express',leads: leads,user: req.user,user1:user1 });
			user.forEach(element => {
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



exports.user1_adddevice_add = function(req, res, next) {
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

exports.user1_adddevice = function(req, res, next) {
	return models.Member.findAll().then(data =>{
		models.Place.findAll().then(data_place =>{
			res.render('user1/user1_adddevice', { title: 'Express',data:data,user: req.user ,data_place:data_place });	
	})
	})	
}
exports.user1_addcamera = function(req, res, next) {
	models.Place.findAll().then(data_place =>{
	return models.Member.findAll().then(data =>{
			res.render('user1/user1_addcamera', { title: 'Express',data:data,user: req.user ,data_place:data_place });	
	})	
	})
}









exports.user1_showdevice = function(req, res, next) {
	console.log(req.user)
	return models.Device.findAll(
		{
			where: {
				place:	req.user.dataValues.place
			}
		}
	).then(data =>{
		models.Place.findAll().then(data_place =>{
			res.render('user1/user1_showdevice', { title: 'Express',data:data,user: req.user ,data_place:data_place });	
	})
	})	
}

exports.user1_editdevice = function(req, res, next) {
	return models.Device.findOne({
		where : {
			id : req.params.data_id
		}
	}).then(data =>{
		res.render('user1/user1_editdevice', { title: 'Express', data:data,user: req.user });	
		//console.log(data.email)
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
		place : req.body.place,
		device_eui : req.body.device_eui,
		position : req.body.position,
		latitude : req.body.latitude,
		longitude : req.body.longitude,
	},{
		where:{
			id : req.body.id
		}
	}).then(result => {
		res.status(200).json({success:true});
	}).catch(e=>{
		return res.status(200).json({success:"false",msg:"Error!!\n  "});
	})
}

exports.delete_device = function(req, res, next) {
	return models.Device.destroy({
		where: {
			id: req.body.id
		}
	}).then(result => {
		res.status(200).json({success:true});
	}).catch(e=>{
		return res.status(200).json({success:"false",msg:"Error!!\n  "});
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
		res.status(200).json({success:true});
	}).catch(e=>{
		return res.status(200).json({success:"false",msg:"Error!!\n  "});
	})
}










exports.user1_addcamera_add = function(req, res, next) {
	var name = req.body.name;
	var ip_port = req.body.ip_port;
	var user = req.body.user;
	var password = req.body.password;
	var position = req.body.position;
	var latitude = req.body.latitude;
	var longitude = req.body.longitude;
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
		return res.status(200).json({success:"false",msg:"Error!!\n  "});
	})	
}

exports.user1_edit_cctv = function(req, res, next) {
	return models.Cctv.findOne({
		where : {
			id : req.params.data_id
		}
	}).then(data =>{
		console.log(data)
		res.render('user1/user1_edit_cctv', { title: 'Express', data:data,user: req.user });	
		//console.log(data.email)
	})
}

exports.user1_edit_cctv_update = function(req, res, next) {
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
		res.status(200).json({success:true});
	}).catch(e=>{
		return res.status(200).json({success:"false",msg:"Error!!\n  "});
	})
}


exports.delete_cctv = function(req, res, next) {
	return models.Cctv.destroy({
		where: {
			id: req.body.id
		}
	}).then(result => {
		res.status(200).json({success:true});
	}).catch(e=>{
		return res.status(200).json({success:"false",msg:"Error!!\n  "});
	})
}


exports.user1_show_cctv = function(req, res, next) {
	console.log('gggggggggggggggggggg')
	return models.Cctv.findOne({
		where : {
			id : req.params.data_id
		}
	}).then(data =>{
		console.log(data)
		models.Member.findAll().then(member =>{
			models.Place.findAll().then(data_place =>{
				res.render('user1/user1_show_cctv', { title: 'Express', data:data,user: req.user,member:member,data_place:data_place });	
			})
		})
		
		//console.log(data.email)
	})
}