var mqtt = require("../MQTT.js/lib/mqtt");
var argv = process.argv;
var logutils = require("../utils/logutils.js");

exports.testMosquitto = function(port,host,timeout){

	var topic = "notif/"+Date.now().toString();
	var payload = "simple_payload";
	logutils.info("Connecting to mosquitto server..");
	mqtt.createClient(port, host, function(err, client) {
		var tid;
		if (err) {
			logutils.endAll("Couldn't Connect to mosquitto server");
		}
		client.connect({
			keepalive : 300
		});
		client.on('connack', function(packet) {
			if (packet.returnCode === 0) {
			//subscribe for test topic
			logutils.info("Testing subscribe..");
			client.subscribe({
				topic : topic
			});
			//publish a test packet
			logutils.info("Publishing a sample packet..");
			client.publish({
				topic:topic,payload:payload
			});
			tid = setTimeout("mosquittoTimedOut",timeout);
			} else {
				logutils.endAll("Couldn't Connect to mosquitto server");
			}
		});

		client.on('error', function(e) {
			client.disconnect();
			logutils.endAll("Mosquitto server error:"+e);
		});
		client.on('publish', function(packet) {
			logutils.info("Recieved the packet..");
			clearTimeout(tid);
			if(packet['payload']!=payload){
				logutils.endAll("Mosquitto pushed wrong values");
			}else{
				
				logutils.info("Mosquitto test Passed !");
			}
			client.disconnect();
		});

		var mosquittoTimedOut = function(){
			logutils.endAll("Mosquitto Timed out");

		};
	});
}