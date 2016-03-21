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
    for (var d in my.devices) {
      my.devices[d].turnOn();
      my.devices[d].brightness(75);
    }
    my.bulb1.rgb(255,0,0); //red
    my.bulb2.rgb(255,128,0); //orange
    my.bulb3.rgb(255,255,0); //yellow
    my.bulb4.rgb(0,255,0); //green
    my.bulb5.rgb(0,0,255); //blue
    my.bulb6.rgb(191,0,255); //purple
    my.bulb7.rgb(255,0,191); //pink
  }
}).start();