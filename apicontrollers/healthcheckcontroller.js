
module.exports = function($app){


	$app.get('/api/healthcheck', function(req, res){
		res.statu(200);
		res.send({
			status: "ok"
		});
	});
};