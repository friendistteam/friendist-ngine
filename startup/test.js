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
//read the configuration file
fs.readFile("../config/config.json",function(err,data){
	var config = JSON.parse(data);
	if(err){
		//Found error in reading configuration
		var s = "Error reading config file"+err;
		endAll(s);
	}
}
//Exits the process of testing with error
var endAll(s){
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