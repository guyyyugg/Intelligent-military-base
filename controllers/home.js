const models = require('../models')
const {Howl, Howler} = require('howler');
var player = require('play-sound')(opts = {})


const FormData = require('form-data');
const Axios = require('axios');
const Fs = require('fs');
const path = require("path");
exports.home_show = function(req, res, next) {
	return models.Lead.findAll().then(leads =>{
		   models.Member.findAll().then(user1 =>{
			res.render('home', { title: 'Express',leads: leads,user: req.user,user1:user1 });
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
exports.submit_data = function(req, res, next) {
	return models.Lead.create({
		email: req.body.data_email
	}).then(lead => {
		res.redirect('/home');
	})
}
exports.check_data = function(req, res, next) {
	return models.Member.findAll().then( leads =>{
		
		//console.log("sdsdwsswwwssws")
		var z=0;
		var i=0
		var sum=0;
		// leads.forEach(element => {
		// 	z++;
		// 	console.log(element.email);
		// } );
		var request = require('request');
 		request.get('http://127.0.0.1:7777/predict/0', 
		function(error, response, body){
    	if(!error){
		  var data = JSON.parse(body);
		  if(data == "unknown"){
			return res.status(404).json({msg:"Found a bad person."});
		  }else{
			return res.status(200).json({msg:"data have in database"});
		  }
    	}

	})
})
}

exports.delete_data = function(req, res, next) {
	return models.Member.destroy({
		where: {
			id: req.params.data_id
		}
	}).then(result => {
		res.redirect('/home')
	})
}
exports.delete_email = function(req, res, next) {
	return models.Member.destroy({
		where: {
			id: req.params.data_id
		}
	}).then(result => {
		res.redirect('/home')
	})
}








exports.check_sensor_pir = function(req, res, next) {
	return models.Pir.findAll().then( leads =>{
		//console.log("guyyuygggg");
		console.log(leads[0].dataValues.status);
		var z=0;
		var i=0
		var sum=0;
		if(leads[0].dataValues.status == '0')
		{
			
		}
		else{
			return res.status(404).json({msg:"Found a bad person."});
		}
		// leads.forEach(element => {
		// 	z++;
		// 	console.log(element.email);
		// } );
		
})
}

exports.cctv_alert = function(req, res, next) {

	console.log(req.body.ip)
	models.Cctv.findOne({
		where : {
			ip_port : req.body.ip
		}
	}).then(data =>{
		global.io.emit('alert_cctv',data);
		count = count+1;    
		//console.log(data.email)
	})

}


exports.upload = async function( req, res, next) {

	const fileRecievedFromClient = req.file;
    let form = new FormData();
    form.append('file', fileRecievedFromClient.buffer, fileRecievedFromClient.originalname);
    form.append('name', req.body.name);
    const p = path.resolve("/home/guy/Desktop/New_stream/"+'trained_knn_model.clf')
    const writer = Fs.createWriteStream(p)
    const response = await Axios.post('http://158.108.168.11:9997/upload', form, {
        headers: {
            'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
            'Content-Disposition': 'attachment;',

        },
        responseType: 'stream'
    }).then(function(resp) {
		
        resp.data.pipe(writer)
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve)
            writer.on('error', reject)
        })
    })


    
        .catch((err) => {
            console.log(err);
        });
}



