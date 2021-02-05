const models = require('../../models')
const {Howl, Howler} = require('howler');
var player = require('play-sound')(opts = {})
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