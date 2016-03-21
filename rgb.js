//node rgb.js 192.168.0.101 82bf6d045f12856fa06cb642cbff0e

"use strict";

var HOSTNAME = "192.168.0.101";
var USERNAME = "82bf6d045f12856fa06cb642cbff0e";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    hue: { adaptor: "hue", host: HOSTNAME, username: USERNAME }
  },

  devices: {
    bulb4: { driver: "hue-light", lightId: 4 }
  },

  randomNumber: function() {
    return Math.floor(Math.random() * 255);
  },

  work: function(my) {
    my.bulb4.turnOn();

    every((0.5).seconds(), function() {
      my.bulb4.rgb(my.randomNumber(), my.randomNumber(), my.randomNumber());
    });
  }
}).start();