// To run:
// $ node leapCircle.js

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

  }
}).start();

Cylon.robot({
  
  name: "huebot",

  connections: {
    hue: { adaptor: 'hue', host: HOSTNAME, username: USERNAME }
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

  randomNumber: function() {
    return Math.floor(Math.random() * 255);
  },

  work: function(my) {
    
    Cylon.MCP.robots.leapbot.devices.leapmotion.on('frame', function(frame) {

      frameCount++;
      if(frameCount % 40 != 0) {return;}

      if(frame.hands.length > 0) {
        //forward
        if (frame.hands[0].sphereCenter[2] < -50) {
          //forward right //Light ID 5
          if (frame.hands[0].sphereCenter[0] > 50) {
            console.log("Turning on Light ID: 5");
            Cylon.bulbs.bulb5.turnOn();
            Cylon.bulbs.bulb5.rgb(0,0,255);
          }
          //forward left //Light ID 3
          else if (frame.hands[0].sphereCenter[0] < -50) {
            console.log("Turning on Light ID: 3");
            Cylon.bulbs.bulb3.turnOn();
            Cylon.bulbs.bulb3.rgb(255,255,0);
          }
          //forward straight //Light ID 4
          else {
            console.log("Turning on Light ID: 4");
            Cylon.bulbs.bulb4.turnOn();
            Cylon.bulbs.bulb4.rgb(0,255,0);
          }
        }
        //backward
        else if (frame.hands[0].sphereCenter[2] > 50) {
          //backward right //Light ID NONE
          if (frame.hands[0].sphereCenter[0] > 50) {
            console.log("Turning on Light ID: NONE");
          }
          //backward left //Light ID 1
          else if (frame.hands[0].sphereCenter[0] < -50) {
            console.log("Turning on Light ID: 1");
            Cylon.bulbs.bulb1.turnOn();
            Cylon.bulbs.bulb1.rgb(255,0,0);
          }
          //backward straight //Light ID 7
          else {
            console.log("Turning on Light ID: 7");
            Cylon.bulbs.bulb7.turnOn();
            Cylon.bulbs.bulb7.rgb(255,0,191);
          }
        }
        //right //Light ID 6
        else if (frame.hands[0].sphereCenter[2] < 50 && frame.hands[0].sphereCenter[2] > -50 && frame.hands[0].sphereCenter[0] > 0) {
          console.log("Turning on Light ID: 6");
          Cylon.bulbs.bulb6.turnOn();
          Cylon.bulbs.bulb6.rgb(191,0,255);
        }
        //left //Light ID 2
        else if (frame.hands[0].sphereCenter[2] < 50 && frame.hands[0].sphereCenter[2] > -50 && frame.hands[0].sphereCenter[0] < 0) {
          console.log("Turning on Light ID: 2");
          Cylon.bulbs.bulb2.turnOn();
          Cylon.bulbs.bulb2.rgb(255,128,0);
        }
        //stop if not going forward, backward, left, or right  
        else {
            console.log("Turning all lights white, hand in center");
            for (var d in Cylon.bulbs) {
              Cylon.bulbs[d].rgb(255,255,255);
            }
        }   
      }
      else { //frame.hands.length = 0
          console.log("Turning all Lights OFF because no frame data");
          for (var d in Cylon.bulbs) {
              Cylon.bulbs[d].turnOff();
          }
      }
    });

  }
}).start();

Cylon.bulbs = Cylon.MCP.robots.huebot.devices;
Cylon.leap = Cylon.MCP.robots.leapbot.devices.leapmotion;