//node brightness.js 192.168.0.101 82bf6d045f12856fa06cb642cbff0e

"use strict";

var HOSTNAME = "192.168.0.101";
var USERNAME = "82bf6d045f12856fa06cb642cbff0e";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    hue: { adaptor: "hue", host: HOSTNAME, username: USERNAME }
  },

  devices: {
    bulb: { driver: "hue-light", lightId: 1 }
  },

  work: function(my) {
    var brightness = 0,
        fade = 5;

    my.bulb.turnOn();

    every((0.5).seconds(), function() {
      brightness += fade;
      my.bulb.brightness(brightness);
      if ((brightness === 0) || (brightness === 100)) { fade = -fade; }
    });
  }
}).start();