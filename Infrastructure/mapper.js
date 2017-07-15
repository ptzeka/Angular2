var mappers = {}

const merge = (a,b) =>{
		const c = Object.assign({},a);
		if(b) //merge extra additional fields to parent
			Object.assign(c,(b || {}));
		return c;
	}

const map = (key,source,overrides) => {
    if(!mappers[key])
        throw new Error("Missing mapper for " + key);
    else
    {
        var toMap = merge(source,overrides || {});
        return mappers[key](source);
    }
}

const load = (profile) => {
    if(typeof profile.load == "function")
        profile.load({
            map: map,
            register: register
        });
    else
        throw new Error("Mapping profile does not have implementation of load method.")
}

const register = (key,func) => {
    if(typeof func != "function")
        throw new Error("Mapper for " + key + " should be a function.");
    mappers[key] = func;
}

module.exports = {
    map: map,
    load: load,
    register: register
}