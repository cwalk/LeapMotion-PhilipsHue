// To run:
// $ node array-blink.js

"use strict";

var HOSTNAME = "192.168.0.101";
var USERNAME = "82bf6d045f12856fa06cb642cbff0e";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    hue: { adaptor: "hue", host: HOSTNAME, username: USERNAME }
  },

  devices: {
    bulb1: { driver: "hue-light", lightId: 1 },
    bulb2: { driver: "hue-light", lightId: 2 },
    bulb3: { driver: "hue-light", lightId: 3 },
    bulb4: { driver: "hue-light", lightId: 4 },
    bulb5: { driver: "hue-light", lightId: 5 },
    bulb6: { driver: "hue-light", lightId: 6 },
    bulb7: { driver: "hue-light", lightId: 7 }
  },

  work: function(my) {
    every((1).second(), function() {
      for (var d in my.devices) {
        my.devices[d].toggle();
      }
    });
  }
}).start();