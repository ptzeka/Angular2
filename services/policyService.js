module.exports = function(logService)
{
    const loggedIn = () => {
    return function(req,res,next)
		{
			if(!req.profile || req.profile.loginStatus != 1)
			{
				res.status(403);
				res.send();
			}
			else
			{
				next();
			}
		};
    };

    return {
        loggedIn: loggedIn
    }
}