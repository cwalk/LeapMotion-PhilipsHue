// To run:
// $ node bridge-state.js
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
    //Obtains the complete status of a bridge
    my.bridge.getFullState(function(err, config) {
      if (err) {
        console.log(err);
      } else {
        console.log(config);
        for( var obj in config.lights) {
          console.log(config.lights[obj].state);
        }
      }
      //See light states for full config
      for(var obj in config.lights) {
        console.log(config.lights[obj].state);
      }
    });
  }
}).start();