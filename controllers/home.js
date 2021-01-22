const models = require('../models')
// var sql = require("../js/opensound.js");
const {Howl, Howler} = require('howler');
var player = require('play-sound')(opts = {})
exports.home_show = function(req, res, next) {
	return models.Lead.findAll().then(leads =>{
		res.render('home', { title: 'Express',leads: leads });
		// console.log(leads[0].dataValues.email)
		// console.log(leads.dataValues.length)

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
		} );
		//res.render('home', { title: 'Express',leads: leads });
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
			return res.status(404).json({msg:"data opensound"});
			// player.play('public/sound/sound.wav', function(err){
 		// 	console.log(err);
			// })
			// sql.a();
			// player.play('../public/sound/sound/mp3')
			// var audio = new Audio('https://firebasestorage.googleapis.com/v0/b/adad-aaf50.appspot.com/o/sound.mp3?alt=media&token=f1fc2f6c-c781-4551-9129-e439866f647b');
  	// 		audio.play();
 			// setTimeout(function () {
    //    			res.redirect('/home');
    // 		}, 5000); 
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
function play123() {
      console.log('open')
      var audio = new Audio('https://firebasestorage.googleapis.com/v0/b/adad-aaf50.appspot.com/o/sound.mp3?alt=media&token=f1fc2f6c-c781-4551-9129-e439866f647b');
  	  audio.play();
    }




