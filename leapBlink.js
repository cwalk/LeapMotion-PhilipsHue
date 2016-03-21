// To run:
// $ node leapBlink.js

var frameCount = 0;

"use strict";

var HOSTNAME = "192.168.0.101";
var USERNAME = "82bf6d045f12856fa06cb642cbff0e";

var Cylon = require("cylon");

Cylon.robot({

  name: "leapbot",

  connections: {
    leapmotion: { adaptor: "leapmotion" }
  },

  devices: {
    leapmotion: { driver: "leapmotion" }
  },

  work: function(my) {

    my.leapmotion.on('frame', function(frame) {

      frameCount++;
      if(frameCount % 40 != 0) {return;}

      if (frame.hands.length > 0) {
        console.log("Bulb ON")
        Cylon.bulb4.turnOn();
      } else {
        console.log("Bulb OFF");
        Cylon.bulb4.turnOff();
      }
    });
  }
}).start();

Cylon.robot({
  
  name: "huebot",

  connections: {
    hue: { adaptor: 'hue', host: HOSTNAME, username: USERNAME }
  },

  devices: {
    bulb4: { driver: 'hue-light', lightId: 4}
  },

  work: function(my) {
    
  }
}).start();

Cylon.bulb4 = Cylon.MCP.robots.huebot.devices.bulb4;