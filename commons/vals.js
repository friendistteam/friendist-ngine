var redis=require("redis");
var logutils = require("../utils/logutils.js");

var client = redis.createClient();
client.on("error",function(err){
	logutils.endAll("Error on redis connection:"+err);
});
exports.save = function(key,val){
	if(client){
		if(key &&val ){
			client.set(key,val);
			logutils.alert("Key/value is empty");
		}
	}
}

exports.getValue = function(key,next){
	if(key && next){
		client.get(key,function(err,val){
			if(err)logutils.alert(err);
			else if(val)next(val);
			else logutils.alert("Value for key:"+key+" , not set");
		});
	}else logutils.alert("key is empty");
}
exports.close = function(){
	client.end();
}
