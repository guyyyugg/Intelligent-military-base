const models = require('../../models')


exports.data_person = function(req, res, next) {
	return models.Lead.findAll().then(leads =>{
		var data = [];
		leads.forEach(element => {
			data.push(element.email);
			// console.log(element.email);
		} );
		return res.status(200).json({'msg':data});
		// let x = leads[0].dataValues.email;
		//console.log(leads[0].dataValues.email);
		// return res.status(200).json({'msg':x});
	})
	
}