const models = require('../models')
const {Howl, Howler} = require('howler');
var player = require('play-sound')(opts = {})
exports.home_show = function(req, res, next) {
	return models.Lead.findAll().then(leads =>{
		res.render('home', { title: 'Express',leads: leads,user: req.user });
		// console.log(leads[0].dataValues.email)
		// console.log(user);
		// console.log(leads);
		// console.log(leads.dataValues.length)
		models.User.findAll().then(user =>{
			user.forEach(element => {
				console.log(element.firstname);
			} );
		})
		
		
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
		res.redirect('/home')
	})
}





