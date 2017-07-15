const load = (mapper) =>{
    user(mapper);
}


const user = (mapper)=> {
    mapper.register("userModel",function(src){
        return {
            key: src.key || "",
            password: src.password || "",
            name: src.name || ""
        }
    });

    mapper.register("profileModel",(src) => {
        return {
            key: src.key || "",
            userKey: src.userKey || "",
            userName: src.userName || "",
            loginstatus: 0,
            authenticationKey: null
        }
    });

}

module.exports.load = load;