var mqtt = require("../MQTT.js/lib/mqtt");

var port = 1883, host = "localhost";
var mqttclient = null;
mqtt.createClient(port, host, function(err, client) {
        if (err)
                process.exit(1);
        client.connect({
                keepalive : 3000,
                username : "nodeserver",
                password : "password"
        });
        client.on('connack', function(packet) {
                if (packet.returnCode === 0) {
                        // client.disconnect();
                        mqttclient = client;
                } else {
                        console.log('connack error %d', packet.returnCode);
                        process.exit(-1);
                }
        });

        client.on('close', function() {
                process.exit(0);
        });

        client.on('error', function(e) {
                console.log('error %s', e);
                process.exit(-1);
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