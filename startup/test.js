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
		console.log(s.red);

	}
}
//Exits the process of testing with error
var endAll(s){
	console.log(s.red);
	console.log("Friendistngine".inverse+" is closing now");
}