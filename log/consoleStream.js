var fs = require("fs");
var os = require("os");

var ConsoleStream = module.exports = function ConsoleStream() {
}
ConsoleStream.prototype ={
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
	if(type == 'ALERT' )
		console.error('[' + type + ":" + date + " ]:" + msg.red.inverse);
	else if(type=='INFO')
		console.log('[' + type + ":" + date + " ]:" + msg.blue.inverse);
	else if(type=='WARN')
		console.log('[' + type + ":" + date + " ]:" + msg.red);
	else console.log('[' + type + ":" + date + " ]:" + msg.blue.inverse);
};
}
}