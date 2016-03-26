## Introduction

Leap Motion projects with Philips Hue lights

## YouTube

YouTube: https://www.youtube.com/watch?v=ghNnTjDSs4w

## Code Setup

Make sure you have nodejs and npm installed.

Make sure you have the Leap Motion SDK installed: https://developer.leapmotion.com/get-started

This is all using the V2 Desktop (and was developed on OSX Yosemite).

Install cylonjs, a robotics javascript framework. More info here: https://cylonjs.com

For more info on Leap Motion, check out: http://cylonjs.com/documentation/drivers/leapmotion/

For more info on Philips Hue, check out: http://cylonjs.com/documentation/platforms/hue/

Clone the directory: `git clone https://github.com/cwalk/LeapMotion-PhilipsHue`

Navigate to the directory and do an `npm install` and you should have cylon, cylon-leapmotion, and cylon-hue in node_modules.

## Philips Hue Setup

Make sure you have your Philips Hue lights plugged in to a power source (like a lamp), and the power source is turned on. Also make sure you have set up the lights on the Philips Hue Bridge.

You will need to know the following:

- LightID for each light you wish to connect to and control (I recommend using the mobile app when you set them up to figure this out easily)
- IP Address of the Philips Hue Bridge
- Philips Hue Bridge Username

It was a little tricky for me to find the username, so hopefully the links below will provide some guidance.

**You will need to replace the HOSTNAME and USERNAME in each JavaScript file with your own IP Address and Bridge username in order for the code to work**

General Help: https://my.meethue.com/en-us/
How to find the username: http://www.developers.meethue.com/documentation/getting-started

## Usage

Run the files by using the command `node filename.js`

## WARNING

An important warning, is that some of the code associated with using the Leap Motion + the Philips Hue lights is a little buggy. This means it might not always run the first time perfectly, so keep re-trying to get a good connection. Sometimes it will even "timeout" and you will have to run the script again.

My reasoning behind this is because there is a lot of network communication going on. Basically because the Leap Motion doesn't have it's own processor, it just sends a bunch of data to your computer. Your computer then has to send that data to the router the Bridge is connected on, through the JavaScript file. Then, the router relays that to the Bridge through a hardwired connection. Then the Bridge finally sends that info to the lights, through the Xigbee protocol. So theres a lot of "inbetweens" that are necessary to send the data from the Leap, to be interpretted by the code on your computer, to perform actions from the lights.

## blink

`blink.js` will simply connect to 1 light, and toggle it on and off, through JavaScript.

## array-blink

`array-blink.js` will connect to an array of lights, as many as you define, and toggle them on and off together.

## bridge-state

`bridge-state.js` will log the entire state of the Philips Hue Bridge. I also added some additional code that will log out the state of each light connected to the Bridge, so you can see which lights are off and on.

## brightness

`brightness.js` will take 1 light and use Pulse-width modulation on it, increasing the brightness by 5% until it reaches 100%, and then decreasing until it reaches 0%, and then repeats.

*For some weird reason, whenever you change the brightness value on the hues, they change blue. I still haven't figured out why, but it's quite annoying*

## rgb

`rgb.js` takes 1 light, and turns it a random color every second.

## disco

`disco.js` is to `rgb.js` as `array-blink.js` is to `blink.js`. This just takes multiple lights, and changes them each a different color.

## turnAllOff

`turnAllOff.js` is a useful script to turn all the lights connected to the bridge off. Useful for debugging and resetting the light states.

## turnAllOn

`turnAllOn.js` is a useful script to turn all the lights connected to the bridge on. Useful for debugging and resetting the light states.

## leapBlink

`leapBlink.js` is the first script I wrote that allows you to turn on the Philips Hue bulbs, with Leap Motion integration. If the Leap Motion sees your hand, it will turn on the lights defined in the script. When it doesnt see your hand, the lights will turn off.

*Be warned, the Leap sends so much data, that it sometimes breaks, as the Philips Hue are connected on a network as explained above. Simply kill the script, run `turnAllOff.js` and try to re-run if you have issues*

## leapGestureBlink

`leapGestureBlink.js` has a couple different uses, but it's main use is to use recognizes gestures from the Leap Motion to do different things with the Philips Hue Lights.

Supported Gestures:
- swipe: Swiping your hand across the Leap Motion will change the brightness of the Hue bulb. The brightness value is derived from how high on the Y axis your hand is in relation to the Leap Motion.
- keyTap: This will change the color of the Hue bulb to a random color, like `rgb.js`, each time a new gesture is recognized.
- screenTap: same as keyTap.

## leapBlink-SeparateRobots

`leapBlink-SeparateRobots.js` is a modification of `leapGestureBlink.js` and is still pretty buggy. There are 3 flags on top, and only 1 can be used at a time. So change whichever function you wish to use to *true* and leave the other 2 *false*.

- adjustRGB: This will allow you to change the color of the Hue bulb based on where your hand is in the X axis as interpretted by the Leap Motion.
- adjustBrightness: This will allow you to change the brightness of the Hue bulb based on where your hand is in the Y axis as interpretted by the Leap Motion.
- gestureControl: Very similar to `leapGestureBlink.js`

## leapCircle

`leapCircle.js` is my personal favorite program written for interaction between the Leap Motion and the Philips Hue.

In this program, I set the lights up around the room in a circle. I then programmed to turn on a specific light if my hand was in that area of space over the Leap Motion. So if the light was directly in front of me, I programmed it so when my hand is directly in front of the Leap Motion, only that light would turn on.

The lights were placed around the room in a circle, so I basically had a control set up like in the diagram below. Where I could move my hand in a giant circle over the Leap to turn on all the lights in the room, in a sort of magical effect. You can also point at individual lights, and they should turn on (because your hand is over the leap in the same direction the light is placed in the room).

When your hand exits the view of the Leap, all the lights will turn off.

![Leap Circle Diagram](/Leap Circle.jpg?raw=true "Leap Circle Diagram")
