// To run:
// $ node leapGestureBlink.js

var HOST = '192.168.0.101';
var USER = '82bf6d045f12856fa06cb642cbff0e';

var frameCount = 0;             // Tracks number of frames leap receives

var adjustRGB = false;          // Adjusts RGB based on xyz position of palm
var adjustBrightness = false;    // Adjusts Brightness based on z position of palm (sets color to Blue for some reason)
var gestureControl = true;     // Rotates through pre-defined array of colors when a gesture is detected

var rotationRGB = [[0,0,255], [0,255,0], [255,0,0], [0,0,0], [255,255,255]];
var rotIndex = 0;

//"use strict";

var Cylon = require("cylon");

Cylon.robot({
  
  name: 'leapbot',

  connections: {
    leapmotion: { adaptor: "leapmotion" }
  },

  devices: {
    leapmotion: { driver: 'leapmotion' }
  },

  work: function(my) {
    
    my.leapmotion.on('frame', function(frame) {

            if (frame.hands.length > 0) {

                if(!Cylon.bulb1.isOn || !Cylon.bulb4.isOn) {
                    console.log("Bulb1 ON")
                    Cylon.bulb1.turnOn();
                    console.log("Bulb4 ON")
                    Cylon.bulb4.turnOn();
                }

                else {  // RGB adjustment

                    if(adjustRGB) {
                        var x = Math.min(1, Math.max(0, (frame.hands[0].sphereCenter[0] / 300) + 0.5));
                        var y = Math.min(1, Math.max(0, (frame.hands[0].sphereCenter[2] / 300) + 0.5));
                        var brightness = Math.min(255, (frame.hands[0].sphereCenter[1] / 4));

                        var rgb = xyBriToRgb(x, y, brightness);

                        Cylon.bulb1.rgb(rgb.r, rgb.g, rgb.b);
                        Cylon.bulb4.rgb(rgb.r, rgb.g, rgb.b);
                    }

                    if(adjustBrightness) {
                        var brightness = Math.min(255, (frame.hands[0].sphereCenter[1] / 4));

                        Cylon.bulb1.brightness(brightness);
                        Cylon.bulb4.brightness(brightness);
                    }

                }

                if(gestureControl) {


                 if(frame.data.gestures.length > 0) {
                    //Gesture support
                    frame.data.gestures.forEach(function (gesture) {
                      //Change brightness when you swipe based off how high your hand is
                        if(gesture.type == "swipe") {
                            console.log('Changing brightness value of bulb for swipe Gesture');
                            Cylon.bulb1.brightness(Math.min(255, (frame.hands[0].sphereCenter[1] / 4)));
                            Cylon.bulb4.brightness(Math.min(255, (frame.hands[0].sphereCenter[1] / 4)));
                        }
                        //Change bulb to random RGB color whenever we recieve a keyTap or screenTap gesture
                        if(gesture.type == "keyTap"){
                            console.log('Changing RGB value of bulb for keyTap Gesture');
                            Cylon.bulb1.rgb(randomNumber(), randomNumber(), randomNumber());
                            Cylon.bulb4.rgb(randomNumber(), randomNumber(), randomNumber());
                        }
                        //Change bulb to random RGB color whenever we recieve a keyTap or screenTap gesture
                        if(gesture.type == "screenTap"){
                            console.log('Changing RGB value of bulb for screenTap Gesture');
                            Cylon.bulb1.rgb(randomNumber(), randomNumber(), randomNumber());
                            Cylon.bulb4.rgb(randomNumber(), randomNumber(), randomNumber());
                        }
                    });
                  }
                  }
                //console.log(frame.data.gestures);
            }

            else {
                if (Cylon.bulb1.isOn) {
                    console.log("Bulb1 OFF");
                    Cylon.bulb1.turnOff();
                }
                if (Cylon.bulb4.isOn) {
                    console.log("Bulb4 OFF");
                    Cylon.bulb4.turnOff();
                }
            }

            frameCount++;

            if(frameCount % 20 != 0) return;
      });
    }
}).start();

Cylon.robot({

    name: 'huebot',

    connections: {
        hue: { adaptor: "hue", host: HOST, username: USER }
    },

    devices: {
        bulb1: { driver: 'hue-light', lightId: 1 },
        bulb2: { driver: 'hue-light', lightId: 2 },
        bulb3: { driver: 'hue-light', lightId: 3 },
        bulb4: { driver: 'hue-light', lightId: 4 }
    },

    work: function(my) {}
}).start();

Cylon.bulb1 = Cylon.MCP.robots.huebot.devices.bulb1;
Cylon.bulb2 = Cylon.MCP.robots.huebot.devices.bulb2;
Cylon.bulb3 = Cylon.MCP.robots.huebot.devices.bulb3;
Cylon.bulb4 = Cylon.MCP.robots.huebot.devices.bulb4;

function xyBriToRgb(x, y, bri){
    var z = 1.0 - x - y;
    var Y = bri / 255.0; // Brightness of lamp
    var X = (Y / y) * x;
    var Z = (Y / y) * z;
    var r = X * 1.612 - Y * 0.203 - Z * 0.302;
    var g = -X * 0.509 + Y * 1.412 + Z * 0.066;
    var b = X * 0.026 - Y * 0.072 + Z * 0.962;
    r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
    g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
    b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
    var maxValue = Math.max(r,g,b);
    r /= maxValue;
    g /= maxValue;
    b /= maxValue;
    r = r * 255;   if (r < 0) { r = 255 };
    g = g * 255;   if (g < 0) { g = 255 };
    b = b * 255;   if (b < 0) { b = 255 };
    return {
        r :r,
        g :g,
        b :b
    }
}

function randomNumber() {
    return Math.floor(Math.random() * 255);
}