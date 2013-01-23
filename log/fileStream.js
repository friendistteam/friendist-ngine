var fs = require("fs");
var os = require("os");

var LargeFileStream = module.exports = function LargeFileStream(dir, length) {
	this.dir = dir;
	this.length = length;
	this.lastwritten = 0;
	var now = new Date();
	this.writestream = fs.createWriteStream(dir + "/" + now.getTime() + ".log",
	{
		'mode' : 0666
	});

}
LargeFileStream.prototype ={
	removeElement : function() {
		this.writestream.end();
	},
	write : function(a) {
// THis stream allow objects with msg field only
var type = a['loglevel'];
var date = a['logtime'];
var msg = a['msg']
if ((typeof type == 'undefined') || (typeof date == 'undefined')
	|| (typeof msg == 'undefined')) {
	console.log("Missing arguments : should be loglevel,logtime,msg");
} else {
	this.writestream.write('[' + type + ":" + date + " ]:" + msg);
	this.writestream.write("\n");
if (Math.abs(this.lastwritten - this.writestream.bytesWritten) >= (1024 * 1024)) {// 1 Mb
// then
// flush
this.lastwritten = 0;
this.writestream.flush();
}
if (this.writestream.bytesWritten == this.length) {
	var now = new Date();
	this.writestream.end();
	this.writestream = fs.createWriteStream(this.dir + "/"
		+ now.getTime() + ".log", {
			'mode' : 0666
		});
	this.lastwritten = 0;
}
}
}
};