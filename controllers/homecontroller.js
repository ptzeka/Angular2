module.exports = function($app,logService){
	
	$app.get('*', function(req, res){
		
		//var profileModel = req.session.profile.toViewModel();
		
		res.render("home", {});
		
	});
}