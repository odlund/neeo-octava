'use strict';

const SerialPort = require('serialport')

const powerOn  = [0x02, 0x30, 0x35, 0x03]
const powerOff = [0x02, 0x30, 0x36, 0x03]

const input1 = [0x02, 0x32, 0x31, 0x03]
const input2 = [0x02, 0x32, 0x32, 0x03]
const input3 = [0x02, 0x32, 0x33, 0x03]
const input4 = [0x02, 0x32, 0x34, 0x03]

var port = new SerialPort('/dev/ttyUSB1', {
    baudRate: 9600
})

port.on('error', function(err) {
      console.log('Error: ', err.message);
})

function sendCommand(cmd) {
    port.write(cmd, function(err) {
        if (err) {
            print("Error", err)
        }
    })
}

module.exports.onButtonPressed = function onButtonPressed(name) {
  console.log(`[CONTROLLER] ${name} button pressed`);

  switch (name) {
      case 'POWER ON':
        sendCommand(powerOn);
        break;
      case 'POWER OFF':
        sendCommand(powerOff);
        break;
      case 'INPUT 1':
        sendCommand(input1);
        break;
      case 'INPUT 2':
        sendCommand(input2);
        break;
      case 'INPUT 3':
        sendCommand(input3);
        break;
      case 'INPUT 4':
        sendCommand(input4);
        break;
  }
};

