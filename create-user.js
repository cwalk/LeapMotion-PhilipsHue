// To run:
// $ node create-user.js 192.168.0.101 82bf6d045f12856fa06cb642cbff0e [new description]

"use strict";

var HOSTNAME = "192.168.0.101";
var USERNAME = "82bf6d045f12856fa06cb642cbff0e";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    hue: { adaptor: "hue", host: HOSTNAME, username: USERNAME }
  },

  devices: {
    bridge: { driver: "hue-bridge" }
  },

  work: function(my) {
    my.bridge.createUser(null, process.argv[4], function(err, user) {
      console.log(err || user);
    });
  }
}).start();