let models = require("../../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../../passport_setup')(passport);
let flash = require('connect-flash');
const {isEmpty} = require('lodash');
const { validateUser } = require('../../validators/signup');
var path = require('path');
const https = require('https')
const fs = require('fs')

exports.data_person = function(req, res, next) {
	return models.Lead.findAll().then(leads =>{
		var data = [];
		leads.forEach(element => {
			data.push(element.email);
			// console.log(element.email);
		} );
		// return res.status(200).json({'msg':data});
		return res.status(200).json(leads[1].dataValues);
	})
	
}
exports.check_login = function(req, res, next) {
	return models.Member.findAll().then(user =>{
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
			return res.status(200).json({"success":"false"});
		}
		if (!user) {
			return res.status(200).json({"success":"false"});
		}
		 req.login(user, function (err) {
			if (err) {
				return res.status(200).json({"success":"false"});
			} else {
                return models.Showlog.findAll().then(data =>{
					models.Member.findAll().then(data1 =>{
						models.Showlog.create({
							email: req.body.email,
							rank : req.body.rank,
							place: req.body.place,
							log : 'Log in'
						})
					res.status(200).json({"success":"sucess",userinfo:user});
			})
		})
			}
		});
	})(req, res, next);
 };



 exports.Showlog = function(req, res, next) {
	 if(req.body.rank == 'Admin'){
		return models.Showlog.findAll().then(datalog =>{
			return res.status(200).json({"success":"sucess",datalog:datalog});
		}).catch(e=>{
			return res.status(200).json({success:"false",msg:"Error!!\n  "});
		})
	 }
	 else if (req.body.rank == 'Supervisor'){
		return models.Showlog.findAll().then(datalog =>{
			return res.status(200).json({"success":"sucess",datalog:datalog});
		}).catch(e=>{
			return res.status(200).json({success:"false",msg:"Error!!\n  "});
		})
	 }
	 else if(req.body.rank == 'Leader'){
		return models.Showlog.findAll({
			where : {
				rank : ['Leader','Soldier']
			}
		}).then(datalog =>{
			return res.status(200).json({"success":"sucess",datalog:datalog});
		}).catch(e=>{
			return res.status(200).json({success:"false",msg:"Error!!\n  "});
		})
	 }
	
}
exports.Showemail = function(req, res, next) {
	if(req.body.rank == 'Admin'){
	   return models.Member.findAll().then(dataemail =>{
		   return res.status(200).json({"success":"sucess",dataemail:dataemail});
		}).catch(e=>{
			return res.status(200).json({success:"false",msg:"Error!!\n  "});

	   })
	}
	else if (req.body.rank == 'Supervisor'){
	   return models.Member.findAll().then(dataemail =>{
		   return res.status(200).json({"success":"sucess",dataemail:dataemail});
	   }).catch(e=>{
		return res.status(200).json({success:"false",msg:"Error!!\n  "});
	})
	}
	else if(req.body.rank == 'Leader'){
	   return models.Member.findAll({
		   where : {
			   rank : ['Leader','Soldier']
		   }
	   }).then(dataemail =>{
		   return res.status(200).json({"success":"sucess",dataemail:dataemail});
	   }).catch(e=>{
		return res.status(200).json({success:"false",msg:"Error!!\n  "});
	})
	}
   
}



const generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
exports.Signup = function(req, res, next) {
	let errors = {};
	return validateUser(errors, req).then(errors => {
		if (!isEmpty(errors)) {
			return res.status(200).json({"success":"false"});
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
						createdby: req.body.user,
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
						createdby: req.body.user,
						phonenumber: req.body.phonenumber,
						simnumber: req.body.simnumber,
						place: req.body.place,
					});
				}
				return newUser.save().then(result => {
					models.Showlog.create({
						email: req.body.email,
						rank : req.body.rank,
						place: req.body.place,
						log : 'Sign Up'
					}).then(x=>{
						return res.status(200).json({"success":"sucess"});
					}).catch(e=>{
						return res.status(200).json({success:"false",msg:"Error!!\n  "});
					})
					
				}).catch(e=>{
					return res.status(200).json({success:"false",msg:"Error!!\n  "});
				})	
			})		
		}
	})
}
exports.Showplace = function(req, res, next) {
	   return models.Place.findAll().then(place =>{
		   return res.status(200).json({"success":"sucess",place:place});
	   }).catch(e=>{
		return res.status(200).json({success:"false",msg:"Error!!\n  "});
	})
}



exports.edit_email = function(req, res, next) {
	//console.log(req.body.id)
	return models.Member.update({
		email : req.body.email,
		firstname : req.body.firstname,
		lastname : req.body.lastname,
		phonenumber : req.body.phonenumber,
		simnumber : req.body.simnumber,
		rank : req.body.rank,
		place: req.body.place
	},{
		where:{
			id : req.body.id
		}
	}).then(result => {
		models.Showlog.create({
			email: req.body.email,
			rank : req.body.rank,
			place: req.body.place,
			log : 'EDIT Email'
		}).then(x=>{
			return res.status(200).json({"success":"sucess"});
		}).catch(e=>{
			return res.status(200).json({success:"false",msg:"Error!!\n  "});
		})
	}).catch(e=>{
		return res.status(200).json({success:"false",msg:"Error!!\n  "});
	})
}
exports.edit_place = function(req, res, next) {
	console.log(req.body.id)
	console.log(req.body.place)
	var place=req.body.place;
	if(isEmpty(place)){
		return res.status(200).json({success:"false",msg:"Error!!\nPlease enter place"});
	}
	return models.Place.update({
		place : req.body.place,
	},{
		where:{
			id : req.body.id
		}
	}).then(result => {
		models.Showlog.create({
			email: req.body.email,
			rank : req.body.rank,
			place: req.body.place,
			log : 'EDIT Base'
		}).then(x=>{
			return res.status(200).json({"success":"sucess"});
		}).catch(e=>{
			return res.status(200).json({success:"false",msg:"Error!!\n  "});
		})
	}).catch(e=>{
		return res.status(200).json({success:"false",msg:"Error!!\n  "});
	})
}

exports.delete_log = function(req, res, next) {
	return models.Showlog.destroy({
		where: {
			id: req.body.id
		}
	}).then(result => {
		return res.status(200).json({success:"sucess"});
	}).catch(e=>{
		return res.status(200).json({success:"false",msg:"Error!!\n  "});
	})
}

exports.delete_place = function(req, res, next) {
	models.Member.findAll({
		where: {
			place: req.body.id
		}
	}).then(async ggg=>{
		//console.log(ggg.length)
		if(ggg.length > 0){
			return res.status(200).json({success:"false",msg:"Error!!\n Have people in base "});
		}else{
			return models.Place.destroy({
				where: {
					id: req.body.id
				}
			}).then(async result => {
				if(result){
					models.Showlog.create({
						email: req.body.email,
						rank : req.body.rank,
						place: req.body.place,
						log : 'Delete Base'
					})
					res.status(200).json({success:"sucess"});
				}else{
					return res.status(200).json({success:"false",msg:"Error!!\n  "});
				}
				
			}).catch(e=>{
				return res.status(200).json({success:"false",msg:"Error!!\n  "});
			})
		}
	})
	
}
exports.delete_email = function(req, res, next) {
	return models.Member.destroy({
		where: {
			id: req.body.id
		}
	}).then(result => {
		models.Showlog.create({
			email: req.body.email,
			rank : req.body.rank,
			place: req.body.place,
			log : 'Delete Email'
		}).then(x =>{
			return res.status(200).json({success:"sucess"});
		}).catch(e=>{
			return res.status(200).json({success:"false",msg:"Error!!\n  "});
		})
		
	}).catch(e=>{
		return res.status(200).json({success:"false",msg:"Error!!\n  "});
	})
}


exports.edit_log = function(req, res, next) {
	var email = req.body.email
	if(isEmpty(email)){
		return res.status(200).json({success:"false",msg:"Error!!\nPlease enter email"});
	}

	return models.Showlog.update({
		email : req.body.email,
		updatedAt : req.body.updatedAt,
		log : req.body.log
	},{
		where:{
			id : req.body.id
		}
	}).then(result => {
		models.Showlog.create({
			email: req.body.email,
			rank : req.body.rank,
			place: req.body.place,
			log : 'EDIT log'
		}).then(x =>{
			return res.status(200).json({success:"sucess"});
		}).catch(e=>{
			return res.status(200).json({success:"false",msg:"Error!!\n  "});
		})
		
	}).catch(e=>{
		return res.status(200).json({success:"false",msg:"Error!!\n  "});
	})
}



exports.Showdevice = function(req, res, next) {
	return models.Device.findAll().then(data =>{
		return res.status(200).json({"success":"sucess",data:data});
	}).catch(e=>{
	 return res.status(200).json({success:"false",msg:"Error!!\n  "});
 })
}

exports.admin_adddevice_add = function(req, res, next) {
	console.log(req.body)
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
		return models.Showlog.create({
			email: req.body.email,
			rank : req.body.rank,
			place: req.body.place,
			log : 'ADD Device'
		}).then(x=>{
			return res.status(200).json({success:"sucess"});
		}).catch(e=>{

			return res.status(200).json({success:false,msg:"Error1"});
		})
		
	}).catch(e=>{
		return res.status(200).json({success:false,msg:"Error!!\n  "});
	})	
}









exports.admin_addcamera_add = function(req, res, next) {
	var name = req.body.name
	var ip_port = req.body.ip_port
	var user = req.body.user
	var password = req.body.password
	var position = req.body.position
	var latitude = req.body.latitude
	var longitude = req.body.longitude
	if(isEmpty(name)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter name camera"});
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
			email: req.body.email,
			rank : req.body.rank,
			place: req.body.place,
			log : 'ADD Camera'
		}).then(result_1 =>{
			return res.status(200).json({success:"success"});
		}).catch(e=>{
			return res.status(200).json({success:false,msg:"Err11111111or!!\n  "});
		})
	}).catch(e=>{
		return res.status(200).json({success:false,msg:"Err22222222222or!!\n  "});
	})	
}






exports.Showcctv = function(req, res, next) {
	return models.Cctv.findAll().then(data =>{
		return res.status(200).json({"success":"sucess",data:data});
	}).catch(e=>{
	 return res.status(200).json({success:"false",msg:"Error!!\n  "});
 })
}






exports.edit_device = function(req, res, next) {

	var device_eui = req.body.device_eui
	var position = req.body.position
	var latitude = req.body.latitude
	var longitude = req.body.longitude
	if(isEmpty(device_eui)){
		return res.status(200).json({success:"false",msg:"Error!!\nPlease enter device_eui"});
	}
	if(isEmpty(position)){
		return res.status(200).json({success:"false",msg:"Error!!\nPlease enter position"});
	}
	if(isEmpty(latitude)){
		return res.status(200).json({success:"false",msg:"Error!!\nPlease enter latitude"});
	}
	if(isEmpty(longitude)){
		return res.status(200).json({success:"false",msg:"Error!!\nPlease enter longitude"});
	}
	//console.log(req.body.id)
	return models.Device.update({
		email : req.body.email,
		rank : req.body.rank,
		device_eui : req.body.device_eui,
		position : req.body.position,
		place : req.body.place,
		latitude : req.body.latitude,
		longitude : req.body.longitude,
	},{
		where:{
			id : req.body.id
		}
	}).then(result => {
		models.Showlog.create({
			email: req.body.email,
			rank : req.body.rank,
			place: req.body.place,
			log : 'EDIT Device'
		}).then(result_1 =>{
			return res.status(200).json({success:"success"});
		}).catch(e=>{
			return res.status(200).json({success:"false",msg:"Error!!\n  "});
		})
		
	}).catch(e=>{
		return res.status(200).json({success:"false",msg:"Error!!\n  "});
	})
}




exports.delete_device = function(req, res, next) {
	console.log(req.body.id)
	console.log('dddddddddddddd')
	console.log(req.body.email)
	console.log(req.body.rank)
	console.log(req.body.place)
	return models.Device.destroy({
		where: {
			id: req.body.id
		}
	}).then(result => {
		models.Showlog.create({
			email: req.body.email,
			rank : req.body.rank,
			place: req.body.place,
			log : 'Delete Device'
		}).then(result_1=>{
			return res.status(200).json({success:"success"});
		}).catch(e=>{
			return res.status(200).json({success:"false",msg:"Error!!\n  "});
		})
		
	}).catch(e=>{
		return res.status(200).json({success:"false",msg:"Error!!\n  "});
	})
}







exports.admin_edit_cctv_update = function(req, res, next) {
	console.log(req.body.name)
	console.log(req.body.ip_port)
	console.log(req.body.user)
	console.log(req.body.password)
	console.log(req.body.position)
	console.log(req.body.latitude)
	console.log(req.body.longitude)
	console.log(req.body.rank)
	console.log(req.body.place)
	console.log(req.body.id)

	var name = req.body.name
	var ip_port = req.body.ip_port
	var user = req.body.user
	var password = req.body.password
	var position = req.body.position
	var latitude = req.body.latitude
	var longitude = req.body.longitude
	if(isEmpty(name)){
		return res.status(200).json({success:"false",msg:"Error!!\nPlease enter name"});
	}
	if(isEmpty(ip_port)){
		return res.status(200).json({success:"false",msg:"Error!!\nPlease enter ip_port"});
	}
	if(isEmpty(user)){
		return res.status(200).json({success:"false",msg:"Error!!\nPlease enter user"});
	}
	if(isEmpty(password)){
		return res.status(200).json({success:"false",msg:"Error!!\nPlease enter password"});
	}
	if(isEmpty(position)){
		return res.status(200).json({success:"false",msg:"Error!!\nPlease enter position"});
	}
	if(isEmpty(latitude)){
		return res.status(200).json({success:"false",msg:"Error!!\nPlease enter latitude"});
	}
	if(isEmpty(longitude)){
		return res.status(200).json({success:"false",msg:"Error!!\nPlease enter longitude"});
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
			email: req.body.email,
			rank : req.body.rank,
			place: req.body.place,
			log : 'EDIT Camrera'
		}).then(result_1 =>{
			return res.status(200).json({success:"success"});
		}).catch(e=>{
			return res.status(200).json({success:"false",msg:"Error!!\n  "});
		})
		
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
		models.Showlog.create({
			email: req.body.email,
			rank : req.body.rank,
			place: req.body.place,
			log : 'Delete Camera'
		}).then(result_1 =>{
			return res.status(200).json({success:"success"});
		}).catch(e=>{
			return res.status(200).json({success:"false",msg:"Error!!\n  "});
		})
		
	}).catch(e=>{
		return res.status(200).json({success:"false",msg:"Error!!\n  "});
	})
}


exports.cctv_status = function(req, res, next) {
	console.log(req.body.status)
	console.log(req.body.id)
	console.log(req.body.email)
	console.log(req.body.rank)
	console.log(req.body.place)

	return models.Cctv.update({
		status : req.body.status
	},{
		where:{
			id : req.body.id
		}
	}).then(result => {
		models.Showlog.create({
			email: req.body.email,
			rank : req.body.rank,
			place: req.body.place,
			log : 'ON/OFF Camera'
		}).then(result_1 =>{
			return res.status(200).json({success:"success"});
		}).catch(e=>{
			return res.status(200).json({success:"false",msg:"error 1!!\n  "});
		})
	}).catch(e=>{
		return res.status(200).json({success:"false",msg:"error2!!\n  "});
	})
}



exports.showcctv_forplace = function(req, res, next) {
	return models.Cctv.findAll(
		{
			where: {
				place: req.body.place
			}
		}
	).then(data =>{
		return res.status(200).json({"success":"sucess",data:data});
	}).catch(e=>{
	 return res.status(200).json({success:"false",msg:"Error!!\n  "});
 })
}
exports.showcctv_forsoldier = function(req, res, next) {
	return models.Cctv.findAll(
		{
			where: {
				place: req.body.place,
				status : 1
			}
		}
	).then(data =>{
		return res.status(200).json({"success":"sucess",data:data});
	}).catch(e=>{
	 return res.status(200).json({success:"false",msg:"Error!!\n  "});
 })
}




exports.addplace_add = function(req, res, next) {
	return models.Place.create({
		place: req.body.place
	}).then(lead => {
		models.Showlog.create({
			email: req.body.email,
			rank : req.body.rank,
			place: req.body.place1,
			log : 'ADD Base'
		}).then(x=>{
			return res.status(200).json({success:"sucess"});
		}).catch(e=>{
			return res.status(200).json({success:"false",msg:"Error11!!\n  "});
		})	
		
	}).catch(e=>{
		return res.status(200).json({success:"false",msg:"Error22!!\n  "});
	})	
}



