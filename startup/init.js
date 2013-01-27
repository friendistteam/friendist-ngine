var fs = require("fs");
var colors = require("colors");
var vars = require("../commons/vars.js")
//log utils
var logutils = require("../utils/logutils.js");

//read the configuration file
fs.readFile("../config/config.json",function(err,data){
	try{
		var config = JSON.parse(data);
		if(err){
		//Found error in reading configuration
		var s = "Error reading config file"+err;
		logutils.endAll(s);
	}
	var host = config['MQTT_HOST'];
	var port = config['MQTT_PORT'];
	var timeout = config['MQTT_TEST_TIMEOUT_MILLISECONDS'];
	logutils.info("Initializing Mosquitto configurations");
	
}catch(cerr){
	logutils.endAll("Error reading config file:"+cerr);
}

});
/*
var logutils.endAll = function(s){
	alert(s);
	filelogger.close();
	consolelogger.close();
	process.exit(1);
}
var pass =function(){
	console.log("Test passed successfully!".green);
}
//for logging utilites  <----
var warn = function(s){
	filelogger.warn({msg:s});
	consolelogger.warn({msg:s});
};

var debug = function(s){
	filelogger.debug({msg:s});
	consolelogger.debug({msg:s});
};
var alert = function(s){
	filelogger.alert({msg:s});
	consolelogger.alert({msg:s});
};
var info = function(s){
	filelogger.info({msg:s});
	consolelogger.info({msg:s});
};*/
