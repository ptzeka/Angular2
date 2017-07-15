var guid = new require("guid");
var profileService = function(userService,logService,mapper)
{
	const createProfile = () =>
	{
		return new Promise(function(resolve,reject){
			const profile = mapper.map("profileModel",{
				key : guid.create().toString(),
				loginstatus : 0
			});
			resolve(profile);
		});
	}

	const logOut = (profile) => {
		if(profile)
		{
			profile.loginstatus = 0;
			profile.userName = null;
			profile.userKey = null;
			profile.authenticationKey = null;
		}
	};

	const logIn = (profile,authenticationKey) => {
		return new Promise((resolve,reject)=>{
			userService.getUserByAuthenticationKey(authenticationKey)
			.then(user=> {
					if(user)
					{
						profile.userKey = user.key;
						profile.userName = user.name;
						profile.authenticationKey = authenticationKey;
						profile.loginStatus = loginStatus.loggedIn;	
					}
					else
					{
						logOut(profile);
					}
					resolve(profile);
					
			},err=> {
				logOut(profile);
				reject(profile);
			})
			.catch(err=> {
				logOut(profile);
				reject(profile);
				logService.log(err);
			})
		})
	}

	return {
		createProfile: createProfile,
		logIn: logIn,
		logOut: logOut
	}
}


module.exports = profileService;