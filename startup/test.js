var fs = require("fs");
var colors = require("colors");
var largeFileStream = require("../log/fileStream.js");
var consoleStreammodule = require("../log/consoleStream.js");
//
var LargeFileStream = new largeFileStream(".",1024*1024*10);
var consoleStream = new consoleStreammodule();
//get the logger
var loggermodule = require("../log/log.js");
var filelogger = new loggermodule(LargeFileStream);
var consolelogger = new loggermodule(consoleStream);

//mosquitto test
var mosquittotest = require("./mosquittotest.js");
//read the configuration file
fs.readFile("../config/config.json",function(err,data){
	try{
		var config = JSON.parse(data);
		if(err){
		//Found error in reading configuration
		var s = "Error reading config file"+err;
		endAll(s);
	}
	var host = config['MQTT_HOST'];
	var port = config['MQTT_PORT'];
	var timeout = config['MQTT_TEST_TIMEOUT_MILLISECONDS'];
	if(host){
		if(port){
			if(timeout){
				mosquittotest.testMosquitto(port,host,timeout,endAll,warn,debug,alert,info);


			}else ("config file doesn't contain mosquitto server timeout");

		}endAll("Config file doesn't contain mosquitto server port");

	}else endAll("Config file doesn't contain mosquitto server host");
}catch(cerr){
	endAll("Error reading config file"+cerr);
}

});
//Exits the process of testing with error
var endAll = function(s){
	alert(s);
	process.exit(1);
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
};
//End of logging utility ---->