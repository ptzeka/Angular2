module.exports = function($app,logService,userService,profileService)
{

	$app.use(function(req, res, next){
		const handleError = (err) => {
			try
			{
				logOut();
				logService.log(err);
			}
			catch(err)
			{
				//ignore
			}
			next();
		}
		
		const createProfile = (authKey,noRetry) => {

			profileService.createProfile()
			.then(profile=>{
				profileService.logIn(profile,authKey)
				.then(profile => {
					req.profile = profile;
					next();
				},()=>{
					try
					{
						req.profile = profile;
						logOut();
					}
					catch(err)
					{
						//ignore
					}
					next();
					
				}).catch(handleError)
			},handleError).catch(handleError);
		}

		const logOut = () => {
			//clear cookies
			res.clearCookie("userKey");
			res.clearCookie("authenticationKey");
			req.profile = profileService.logOut(req.profile);
		}
		
		createProfile(req.cookies.authenticationKey);
		
	});
};