// To run:
// $ node blink.js

var HOSTNAME = "192.168.0.101";
var USERNAME = "82bf6d045f12856fa06cb642cbff0e";

var Cylon = require('cylon');

Cylon.robot({
  connections: {
    hue: { adaptor: "hue", host: HOSTNAME, username: USERNAME }
  },

  devices: {
    bulb1: { driver: 'hue-light', lightId: 1 }
  },

  work: function(my) {
    every((1).second(), function() {
      my.bulb1.toggle();
    });
  }
}).start();