const models = require('../../models')
const {Howl, Howler} = require('howler');
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../../passport_setup')(passport);
let flash = require('connect-flash');
const {isEmpty} = require('lodash');
const { validateUser } = require('../../validators/signup');
const Swal = require('sweetalert2')
exports.admin_show = function(req, res, next) {
	return models.Member.findAll().then(user1 =>{
		if(req.user.dataValues.rank=="Admin"){
			models.Cctv.findAll().then(cctvData =>{
			models.Place.findAll().then(data_place =>{
			res.render('admin/admin_home', { title: 'Express',user: req.user,user1:user1,cctvData:cctvData ,data_place:data_place});
			})
			})
		}
		else if(req.user.dataValues.rank=="Supervisor"){
			models.Cctv.findAll().then(cctvData =>{
			models.Place.findAll().then(data_place =>{
			res.render('user3/user3_home', { title: 'Express',user: req.user,user1:user1,cctvData:cctvData ,data_place:data_place });
		})
		})
		}
		else if(req.user.dataValues.rank=="Leader"){
			console.log('LeaderLeaderLeaderLeaderLeaderLeaderLeaderLeaderLeaderLeader')
			console.log(req.user.dataValues)
			models.Cctv.findAll(
				{
					where: {
						place:	req.user.dataValues.place
					}
				}
			).then(cctvData =>{
				
				models.Place.findAll().then(data_place =>{
			res.render('user2/user2_home', { title: 'Express',user: req.user,user1:user1,cctvData:cctvData ,data_place:data_place });
		})
	})
		}
		else if(req.user.dataValues.rank=="Soldier"){
			models.Cctv.findAll({
					where: {
						place:	req.user.dataValues.place
					}
				}).then(cctvData =>{
				models.Place.findAll().then(data_place =>{
				
			res.render('user1/user1_home', { title: 'Express',user: req.user,user1:user1,cctvData:cctvData ,data_place:data_place });
		})
	})
		}
		// console.log(leads.dataValues.length)
		// models.User.findAll().then(user =>{
		// 	user.forEach(element => {
		// 		// console.log(element.firstname);
		// 	} );
		// })
	})	
}
exports.admin_adddevice = function(req, res, next) {
	return models.Member.findAll().then(data =>{
		models.Place.findAll().then(data_place =>{
			res.render('admin/admin_adddevice', { title: 'Express',data:data,user: req.user,data_place:data_place  });	
		})
	})	
}
exports.admin_addcamera = function(req, res, next) {
	return models.Member.findAll().then(data =>{
		models.Place.findAll().then(data_place =>{
			res.render('admin/admin_addcamera', { title: 'Express',data:data,user: req.user ,data_place:data_place });	
		})
	})	
}
exports.admin_showlog = function(req, res, next) {
	return models.Showlog.findAll().then(data =>{
		models.Place.findAll().then(data_place =>{
			res.render('admin/admin_showlog', { title: 'Express',data:data,user: req.user,data_place:data_place  });	
	})	
})	
}

exports.admin_showemail = function(req, res, next) {

	return models.Member.findAll().then(async data =>{
			models.Place.findAll().then(data_place =>{
				res.render('admin/admin_showemail', { title: 'Express',data:data,user: req.user ,data_place:data_place });	
			//console.log(data_place)
		})	
			
	}).catch(err=>{
		//res.render('admin/admin_showemail', { title: 'Express',data:data,user: req.user  });
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
const rerender_signup = function(errors, req, res, next) {
	return models.Place.findAll().then(data =>{
	res.render('admin/admin_signup', { formData: req.body, errors: errors,user: req.user,data:data});
	//console.log(errors)
})	
}
const generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}


exports.admin_showsignup = function(req, res, next) {
	return models.Place.findAll().then(data =>{
		res.render('admin/admin_signup', { formData: {}, errors: {},user: req.user,data:data });
		//console.log(data)
	})	
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
					res.redirect("/admin_showemail?success=true");
					//res.redirect("/admin_showemail")
					// passport.authenticate('local', {
					// 	successRedirect: "/admin_showemail",
					// 	failureRedirect: "/admin_signup",
					// 	failureFlash: true
					// })(req, res, next);
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


	exports.delete_email = function(req, res, next) {
		return models.Member.destroy({
			where: {
				id: req.body.id
			}
		}).then(result => {
			models.Showlog.create({
				email: req.user.email,
				rank : req.user.rank,
				place: req.user.place,
				log : 'Delete email'
			})
			res.status(200).json({success:true});
		}).catch(e=>{
			return res.status(200).json({success:false,msg:"Error!!\n  "});
		})
	}
	
	exports.delete_log = function(req, res, next) {
		return models.Showlog.destroy({
			where: {
				id: req.body.id
			}
		}).then(result => {
			res.status(200).json({success:true});
		}).catch(e=>{
			return res.status(200).json({success:false,msg:"Error!!\n  "});
		})
	}

exports.admin_edit_email = function(req, res, next) {
	
	//console.log(req.params.data_id)
	return models.Member.findOne({
		where : {
			id : req.params.data_id
		}
	}).then(data =>{
		models.Place.findAll().then(data_1111 =>{
			res.render('admin/admin_edit', { title: 'Express', data:data,user: req.user ,data_1111:data_1111});	
			console.log(data_1111)
		})	
		
		//console.log(data.email)
	}).catch(e=>{
		return res.status(200).json({success:false,msg:"Error!!\n  "});
	})
}
exports.edit_email = function(req, res, next) {
	var email = req.body.email;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var phonenumber = req.body.phonenumber;
	var simnumber = req.body.simnumber;
	var rank = req.body.rank;
	var place = req.body.place;

	if(isEmpty(email)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter email"});
	}
	if(isEmpty(firstname)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter firstname"});
	}
	if(isEmpty(lastname)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter lastname"});
	}
	if(isEmpty(phonenumber)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter phonenumber"});
	}
	if(isEmpty(simnumber)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter simnumber"});
	}
	if(isEmpty(rank)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter rank"});
	}
	if(isEmpty(place)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter place"});
	}
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
			email: req.user.email,
			rank : req.user.rank,
			place: req.user.place,
			log : 'EDIT email'
		})
		res.status(200).json({success:true});
	}).catch(e=>{
		return res.status(200).json({success:false,msg:"Error!!\n  "});
	})
}



exports.admin_edit_log = function(req, res, next) {
	
	//console.log(req.params.data_id)
	return models.Showlog.findOne({
		where : {
			id : req.params.data_id
		}
	}).then(data =>{
		models.Place.findAll().then(data_place =>{
		res.render('admin/admin_edit_log', { title: 'Express', data:data,user: req.user,data_place:data_place });	
		//console.log(data.email)
	})
	}).catch(e=>{
		return res.status(200).json({success:false,msg:"Error!!\n  "});
	})
}
exports.edit_log = function(req, res, next) {
	var email = req.body.email
	if(isEmpty(email)){
		return res.status(200).json({success:false,msg:"Error!!\nPlease enter email"});
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
			email: req.user.email,
			rank : req.user.rank,
			place: req.user.place,
			log : 'EDIT log'
		})
		res.status(200).json({success:true});
	}).catch(e=>{
		return res.status(200).json({success:false,msg:"Error!!\n  "});
	})
}

exports.admin_addplace = function(req, res, next) {
	return models.Place.findAll().then(async data =>{
			
			res.render('admin/admin_addplace', { title: 'Express',data:data,user: req.user  });	
			//console.log(data)
	}).catch(err=>{
		//res.render('admin/admin_showemail', { title: 'Express',data:data,user: req.user  });
	}).catch(e=>{
		return res.status(200).json({success:false,msg:"Error!!\n  "});
	})	
}
exports.admin_addplace_add = function(req, res, next) {
	return models.Place.create({
		place: req.body.place
	}).then(lead => {
		models.Showlog.create({
			email: req.user.email,
			rank : req.user.rank,
			place: req.user.place,
			log : 'ADD Base'
		})
		res.status(200).json({success:true});
	}).catch(e=>{
		return res.status(200).json({success:false,msg:"Error!!\n  "});
	})	
}
exports.delete_place = function(req, res, next) {
	models.Member.findAll({
		where: {
			place: req.body.id
		}
	}).then(sum=>{
		if(sum.length >0){
			return res.status(200).json({success:false,msg:"Error!!\n Have people in Base "});
		}else if(sum==0){
			return models.Place.destroy({
				where: {
					id: req.body.id
				}
			}).then(result => {
				models.Showlog.create({
					email: req.user.email,
					rank : req.user.rank,
					place: req.user.place,
					log : 'Delete Base'
				})
				res.status(200).json({success:true});
			}).catch(e=>{
				return res.status(200).json({success:false,msg:"Error!!\n  "});
			})
		}
	})
	
}

exports.edit_place = function(req, res, next) {
	return models.Place.update({
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
			log : 'EDIT Base'
		})
		res.status(200).json({success:true});
	}).catch(e=>{
		return res.status(200).json({success:false,msg:"Error!!\n  "});
	})
}

exports.admin_adddevice_add = function(req, res, next) {

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
		return res.status(200).json({success:true});
	}).catch(e=>{
		return res.status(200).json({success:false,msg:"Error!!\n  "});
	})	
}



exports.admin_showdevice = function(req, res, next) {
	return models.Device.findAll().then(data =>{
		models.Place.findAll().then(data_place =>{
			res.render('admin/admin_showdevice', { title: 'Express',data:data,user: req.user ,data_place:data_place  });	
		})
	}).catch(e=>{
		return res.status(200).json({success:false,msg:"Error!!\n  "});
	})	
}

exports.admin_editdevice = function(req, res, next) {
	console.log('00000000000000000000000')
	console.log(req.params.data_id)
	return models.Device.findOne({
		where : {
			id : req.params.data_id
		}
	}).then(data =>{
		models.Place.findAll().then(data_1111 =>{
		res.render('admin/admin_editdevice', { title: 'Express', data:data,user: req.user,data_1111:data_1111 });	
		//console.log(data.email)
	})
	}).catch(e=>{
		return res.status(200).json({success:false,msg:"Error!!\n  "});
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

exports.admin_edit_cctv = function(req, res, next) {
	return models.Cctv.findOne({
		where : {
			id : req.params.data_id
		}
	}).then(data =>{
		console.log(data)
		models.Place.findAll().then(data_1111 =>{
		res.render('admin/admin_edit_cctv', { title: 'Express', data:data,user: req.user,data_1111:data_1111 });	
		//console.log(data.email)
	})
	}).catch(e=>{
		return res.status(200).json({success:false,msg:"Error!!\n  "});
	})
}

exports.admin_edit_cctv_update = function(req, res, next) {
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
			log : 'EDIT Camrera'
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


exports.admin_cctv_status = function(req, res, next) {
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