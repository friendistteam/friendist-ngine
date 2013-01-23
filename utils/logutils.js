//Exits the process of testing with error
var fs = require("fs");
var colors = require("colors");
var largeFileStream = require("../log/fileStream.js");
var consoleStreammodule = require("../log/consoleStream.js");
//
var LargeFileStream = new largeFileStream("../log/logs",1024*1024*10);
var consoleStream = new consoleStreammodule();
//get the logger
var loggermodule = require("../log/log.js");
var filelogger = new loggermodule(LargeFileStream);
var consolelogger = new loggermodule(consoleStream);

exports.endAll = function(s){
	this.alert(s);
	filelogger.close();
	consolelogger.close();
	process.exit(1);
}
exports.pass =function(){
	console.log("Test passed successfully!".green);
}
//for logging utilites  <----
exports.warn = function(s){
	filelogger.warn({msg:s});
	consolelogger.warn({msg:s});
};

exports.debug = function(s){
	filelogger.debug({msg:s});
	consolelogger.debug({msg:s});
};
exports.alert = function(s){
	filelogger.alert({msg:s});
	consolelogger.alert({msg:s});
};
exports.info = function(s){
	filelogger.info({msg:s});
	consolelogger.info({msg:s});
};
//End of logging utility ---->