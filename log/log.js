// creates a logger to write on stream
// ALERT for alerting notifications
exports.ALERT = 1;
// INFO for information
exports.INFO = 2;
// DEBUG for debugging logging
exports.DEBUG = 3;
// WARN for Warnings
exports.WARN = 4;

var Logger = module.exports = function Logger(stream) {
	this.stream = stream;
}

Logger.prototype = {
	// Using save here for different log streams;
	save : function(type, msg, done) {
		var logmsg = {
			loglevel : type,
			logtime : new Date()
		};
		for ( var a in msg) {
			logmsg[a] = msg[a];
		}
		this.stream.write(logmsg, done);
	},
	// info , the msg should be an object
	info : function(msg, done) {
		this.save('INFO', msg, done);
	},
	debug : function(msg) {
		this.save('DEBUG', msg);
	},
	warn : function(msg) {
		this.save('WARN', msg);
	},
	alert : function(msg) {
		this.save('ALERT', msg);
	},
	close : function() {
		this.stream.close();
	}
};