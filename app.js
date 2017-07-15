global.$root = require("path").resolve(".");;
var express = require('express');
var session = require('express-session')
var exphbs  = require('express-handlebars');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')

var port = 8080;

var app = express();
app.use(session({
  secret: 'NG-test',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, expires: new Date(Date.now() + 1000*60*30) }
}));

app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({ 
  extended: true
})); 

app.use(express.static('./static'));
app.use(cookieParser());
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    toJSON : function(object) {
      if(!object)
        return null;
      return JSON.stringify(object);
    }
  }
}));
app.set('view engine', 'handlebars');

//create ioc container
var appConfig = require("./app-config.js");
appConfig.configure(app);


var server = require('http').createServer(app);  


//register socket.io
var io = require('socket.io').listen(server);
appConfig.socket(io);

//start listening
server.listen(port);  

console.log("App started on " + port)
