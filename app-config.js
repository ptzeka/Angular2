
const configure = ($app) => {
    //mapping
    var mapper = require("./infrastructure/mapper.js");
    var mappingProfile = require("./infrastructure/mappingProfile.js");
    mapper.load(mappingProfile);
   

    //services
    var logService = new require("./services/logService.js")();
    var policyService = new require("./services/policyService.js")(logService);
    var userService = new require("./services/userService.js")(logService,mapper);
    var profileService = new require("./services/profileService.js")(userService,logService,mapper);

    //filters
    new require("./filters/profileFilter.js")($app,logService,userService,profileService);

    //controllers
    new require("./controllers/homecontroller.js")($app,logService);

    //api controllers
    new require("./apicontrollers/healthcheckcontroller.js")($app);
}

const socket = ($socket) => {

}

module.exports.configure = configure;
module.exports.socket = socket;