var mqtt = require("../MQTT.js/lib/mqtt");
var argv = process.argv;

exports.testMosquitto = function(port,host,timeout,endAll,warn,debug,alert,info){

	var topic = "notif/"+Date.now().toString();
	var payload = "simple_payload";
	info("Connecting to mosquitto server..");
	mqtt.createClient(port, host, function(err, client) {
		var tid;
		if (err) {
			endAll("Couldn't Connect to mosquitto server");
		}
		client.connect({
			keepalive : 300
		});
		client.on('connack', function(packet) {
			if (packet.returnCode === 0) {
			//subscribe for test topic
			info("Testing subscribe..");
			client.subscribe({
				topic : topic
			});
			//publish a test packet
			info("Publishing a sample packet..");
			client.publish({
				topic:topic,payload:payload
			});
			tid = setTimeout("mosquittoTimedOut",timeout);
			} else {
				endAll("Couldn't Connect to mosquitto server");
			}
		});

		client.on('error', function(e) {
			client.disconnect();
			endAll("Mosquitto server error:"+e);
		});
		client.on('publish', function(packet) {
			info("Recieved the packet..");
			clearTimeout(tid);
			if(packet['payload']!=payload){
				endAll("Mosquitto pushed wrong values");

			};
		});

		var mosquittoTimedOut = function(){
			endAll("Mosquitto Timed out");

		};
	});
}