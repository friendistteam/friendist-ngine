var fs = require("fs");
var colors = require("colors");
//log utils
var logutils = require("../utils/logutils.js");
//mosquitto test
var mosquittotest = require("./mosquittotest.js");
var mongotest = require("./mongotest.js");
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
	logutils.info("Mosquitto at:"+host+":"+port+"  timeout:"+timeout);
	//mosquittotest.testMosquitto(port,host,timeout,logutils.endAll,warn,debug,alert,info);
	if(host){
		if(port){
			if(timeout){
				mosquittotest.testMosquitto(port,host,timeout);

			}else ("config file doesn't contain mosquitto server timeout");

		}else logutils.endAll("Config file doesn't contain mosquitto server port");

	}else logutils.endAll("Config file doesn't contain mosquitto server host");
	//success//

	//test mongo
	var mongohost = config['MONGO_HOST'];
	if(mongohost){
		mongotest.testMongo(mongohost);
	}else{
		logutils.endAll("Couldn't connect to mongo db");
	}
	
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
