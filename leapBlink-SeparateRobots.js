// To run:
// $ node leapBlink.js 192.168.0.101 82bf6d045f12856fa06cb642cbff0e

var HOST = '192.168.0.101';
var USER = '82bf6d045f12856fa06cb642cbff0e';

var frameCount = 0;             // Tracks number of frames leap receives

// PARAMETERS FOR TESTING FUNCTIONS
// ONLY USE ONE AT A TIME

var adjustRGB = false;          // Adjusts RGB based on xyz position of palm
var adjustBrightness = false;    // Adjusts Brightness based on z position of palm (sets color to Blue for some reason)
var gestureControl = true;     // Rotates through pre-defined array of colors when a gesture is detected

///////////////////////////////////

var rotationRGB = [[0,0,255], [0,255,0], [255,0,0], [0,0,0], [255,255,255]];
var rotIndex = 0;

"use strict";

var Cylon = require("cylon");

Cylon.robot({
    name: 'leapmotionRobot',

    connections: {
        leapmotion: { adaptor: "leapmotion" }
    },

    devices: {
        leapmotion: { driver: "leapmotion" }
    },

    work: function(my) {

        console.log("You just ran node leapBlink.js " + process.argv[2] + " " + process.argv[3]);

        my.leapmotion.on('frame', function(frame) {

            frameCount++;

            if(frameCount % 20 != 0) return;

            if (frame.hands.length > 0) {

                //console.log(frame.hands[0].sphereCenter[0], frame.hands[0].sphereCenter[2]);

                if(!Cylon.bulb1.isOn) {
                    console.log("Bulb ON")
                    Cylon.bulb1.turnOn();
                }
                else {  // RGB adjustment

                    if(adjustRGB) {
                        var x = Math.min(1, Math.max(0, (frame.hands[0].sphereCenter[0] / 300) + 0.5));
                        var y = Math.min(1, Math.max(0, (frame.hands[0].sphereCenter[2] / 300) + 0.5));
                        var brightness = Math.min(255, (frame.hands[0].sphereCenter[1] / 4));

                        var rgb = xyBriToRgb(x, y, brightness);

                        Cylon.bulb1.rgb(rgb.r, rgb.g, rgb.b);
                    }

                    if(adjustBrightness) {
                        var brightness = Math.min(255, (frame.hands[0].sphereCenter[1] / 4));

                        Cylon.bulb1.brightness(brightness);
                    }

                }

                if(gestureControl) {
                    if(frame.data.gestures.length > 0) {
                        rotIndex = (rotIndex + 1) % rotationRGB.length;

                        Cylon.bulb1.rgb(rotationRGB[rotIndex][0], rotationRGB[rotIndex][1], rotationRGB[rotIndex][2]);
                    }
                }
                console.log(frame.data.gestures);
            }

            else {
                if (Cylon.bulb1.isOn) {
                    console.log("Bulb OFF");
                    Cylon.bulb1.turnOff();

                }
            }
        });

    }
}).start();

Cylon.robot({

    name: 'hueRobot',

    connections: {
        hue: { adaptor: "hue", host: HOST, username: USER }
    },

    devices: {
        bulb1: { driver: 'hue-light', lightId: 1 },
    },

    work: function(my) {

    }
}).start();

Cylon.bulb1 = Cylon.MCP.robots.hueRobot.devices.bulb1;


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