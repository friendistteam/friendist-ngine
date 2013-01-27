var redis=require("redis");
var logutils = require("../utils/logutils.js");

var client = redis.createClient();
client.on("error",function(err){
	logutils.endAll("Error on redis connection:"+err);
});
exports.save = function(key,val){
	if(client){
		if(key && val ){
			client.set(key,val);
			logutils.info("Saved for key:"+key);
		}else logutils.alert("Key/value is empty");
	}
}
exports.getValues = function(keys,next){
	if(keys && next){
		client.mget(keys,function(err,reply){
			if(err)logutils.alert(err);
			next(reply);
		});
	}
};
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

