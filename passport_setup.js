module.exports = function(passport) {
	passport.serializeUser(function(user,done){
		done(null,user.id)
	});
	passport.deserializeUser(function(user,done){
		models.User.findOne({
			where: {
				'id' : id
			}
		}).then(user =>{
			if(user == null) {
				done(new Error('wrong user id.'))
			}
			done(null,user);
		})
	})
}