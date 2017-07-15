var guid = require("guid");
var crypto = require("crypto");

module.exports = function(logService,mapper)
{
	var users = {};
	var authentications = {};

	
	const createUser = (name,password) =>
	{
		return new Promise(function(resolve,reject)
		{
			getUserByName(name)
			.then(function(user){
				reject("User already exists");
			},function(err){
				var secret = "Shh! This is a secret!";
				var salt = "Salty crabcakes";
				
				crypto.pbkdf2(secret,salt, 100000, 512, 'sha512', function(err, passwordKey) {
					if (err) 
					{
				  		throw new Error(err);
					}
			  		var user = mapper.map("userModel",{
						key: guid.create().toString(),
						password: passwordKey,
						name: name
					});

					users[user.key] = user;

					resolve(getUser(user.key));
				});
	
			})
			.catch(logService.log)
		});
	}
	
	const getUser = (key) =>
	{
		return new Promise(function(resolve,reject)
		{
			if(users[key])
				resolve(mapper.map("userModel",users[key]));
			else
				reject("User not found")
		});
	}
	
	const getUserByName = (name) =>
	{
		return new Promise(function(resolve,reject){
			var user = null;
			for(var k in users)
			{
				if(users[k].name == name)
				{
					user = users[k];
					break;
				}
			}
			if(user != null)
			{
				resolve(user);
			}
			else
				reject("User not found");
		});
	}

	const getUserByAuthenticationKey = (authKey) => {
		return new Promise((resolve,reject)=>{
			var auth = authentications[authKey];
			if(!auth || auth.expiration < new Date().getTime())
				reject("Not authenticated");
			else 
			{
				//slide cache
				auth.expiration = new Date().getTime() + 1000*60*10;
				resolve(getUser(auth.userKey));
			}
		});
	}

	const authenticate = (userName,password) =>
	{
		return new Promise(function(resolve,reject){
			
			if(!userName)
				reject("Username is required");
			else if(!password)
				reject("Password is required");
			else
			{
				var secret = "Shh! This is a secret!";
				var salt = "Salty crabcakes";
				
				crypto.pbkdf2(secret,salt, 100000, 512, 'sha512', function(err, passwordKey) {
					if (err)
				  		throw new Error("Failed to generate password");
			  		getUserByName(userName)
					.then(user=>{
						if(user.password.equals(passwordKey))
						{
							const authkey = guid.create().toString();
							const auth = authentications[authkey] = {
								key: authkey,
								userKey: user.key,
								expiration: new Date().getTime() + 1000*60*20
							}
							resolve(auth);
						}
						else
							reject("User name or password does not match.")
						
					},err=>{
						logService.log(err);
						reject("User name or password does not match.");
					})
					.catch(reject);
			  		
				});
				
			}
		});
	}

	createUser("peri","peri")
	.then(user => {
		//hardcode default createUser
		delete users[user.key];
		user.key = "999999";
		users["999999"] = mapper.map("userModel",user);
		console.log("user peri created");

	},logService.log).catch(logService.log);

	createUser("reris","reris")
	.then(user => {
		//hardcode default createUser
		delete users[user.key];
		user.key = "999998";
		users["999998"] = mapper.map("userModel",user);
		console.log("user reris created");

	},logService.log).catch(logService.log);

	return {
		getUserByAuthenticationKey: getUserByAuthenticationKey,
		authenticate: authenticate,
		createUser: createUser,
		getUser: getUser,
		getUserByName: getUserByName
	}
}