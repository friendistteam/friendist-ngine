var mongoose = require("mongoose");
var logutils = require("../utils/logutils.js");

exports.testMongo = function(host,collectioname){
	try{
		var db = mongoose.createConnection(host,collectioname);
		if(db){
			logutils.info("Mongo Test Successfull !");
			db.close();
		}else{
			logutils.endAll("Couldn't connect to mongo db");
		}
	}catch(e){
		logutils.endAll("Couldn't connect to mongo db");
	}

}