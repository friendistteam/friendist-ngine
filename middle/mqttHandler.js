var mqtt = require("../MQTT.js/lib/mqtt");
var vals = require("../commons/vals.js");
var constants = require("../commons/constants.js");
var logutils = require("../utils/logutils.js");

var ARGS = [constants.MQTT_HOST,constants.MQTT_PORT,constants.MQTT_Username,constants.MQTT_Password];
var mqttclient;
//Getting host,port ,user and password
vals.getValues(ARGS,createClient);
function createClient(list){
        //Called when the values are recieved
        var host = list[0];
        var port = list[1];
        var username = list[2];
        var password = list[3];
        //creating an mqtt publisher
        mqtt.createClient(port, host, function(err, client) {
                if (err)
                        logutils.endAll("Error mqtt client:"+err);
                client.connect({
                        keepalive : 3000,
                        username : username,
                        password : password
                });
                client.on('connack', function(packet) {
                        if (packet.returnCode === 0) {
                        // client.disconnect();
                        mqttclient = client;
                } else {
                        logutils.endAll("Connection error : MQTT connection failed");
                }
        });

                client.on('error', function(e) {
                        logutils.endAll("MQTTCLient error:"+e);
                });
                client.request = function(e) {
                        var id = e['id'];
                        var payload = e['payload'];
                        if (topic) {
                                if (payload) {
                                        client.publish({
                                                topic : id,
                                                payload : payload
                                        });
                                }
                        }
                };
        });
}

exports.push = function(id, payload) {
        if (mqttclient) {
                mqttclient.request({
                        id : id,
                        payload : payload
                });

        } else {
                return -1;
        }

}
exports.close = function(){
        client.disconnect();
}