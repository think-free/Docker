const request = require("request").defaults({jar: true})
    , fs = require("fs")
    , unifi = require("node-unifi");


try {
    var config = JSON.parse(fs.readFileSync("config.json", "utf-8"));
}
catch (err) {
    if (err.code = 'ENOENT') {
        console.log(err);
        console.log('config.json missing or invalid, please see README.md');
        return;
    } else {
        throw err;
    }
}

var iVar;

// Objects containing lists of all previously registered access points and clients and the times they registered
var nodes = { };
var clients = { };

var controller = new unifi.Controller(config.unifi.addr, config.unifi.port);

function getStats() {
    controller.getClientDevices(config.unifi.site, function(error, data) {
        if (error) {
            console.log(`error: ${error}`);
            clearInterval(iVar);
            return;
        }
        var payloads = { };
        var timestamp = Date.now();
        data[0].forEach(function(client) {
            if (!client.is_wired) {
                if (payloads[client.ap_mac] == undefined) {
                    if (nodes[client.ap_mac] == undefined) {
                        console.log(`new node '${client.ap_mac}' online at ${timestamp}`);
                        nodes[client.ap_mac] = timestamp;
                    }
                    payloads[client.ap_mac] = {
                        d: client.ap_mac,
                        s: {wifi: {}, bluetooth: {}, gps : {}},
                        t: timestamp,
                        f: config.findlf.group
                    }
                }
                if (clients[client.mac] == undefined) {
                        console.log(`new client '${client.mac}' online at ${timestamp}`);
                        clients[client.mac] = timestamp;
                }
                payloads[client.ap_mac].s.wifi[client.mac] = client.signal;
            }
        });
        Object.keys(payloads).forEach(function(node) {
            //console.log("-----------------------");
            //console.log(payloads[node])
            request(
                {
                    method: 'POST',
                    url: config.findlf.url + '/passive',
                    json: payloads[node]
                 }, function(error, response, body) {
                    if (error) {
                        console.log(`error: ${error}`);
                        clearInterval(iVar);
                        return;
                    } else {
                        console.log(response.body);
                    }
                });
        });
    });
}

controller.login(config.unifi.username, config.unifi.password, function(error) {
    if (error) {
        console.log(`error: ${error}`);
        return;
    }
    getStats();
    iVar = setInterval(getStats, config.other.interval*1000);
});
