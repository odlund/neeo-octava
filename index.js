'use strict';

const neeoapi = require('neeo-sdk');
const controller = require('./controller');

console.log('Octava HD41ARC Serial Controller');
console.log('---------------------------------------------');

/*
 * Adapter - an Adapter contains one or more DEVICES. In this case we only use a single very
 * simple device.
 */

// first we set the device info, used to identify it on the Brain
const octavaController = neeoapi.buildDevice('HD41ARC Serial Controller')
  .setManufacturer('Octava')
  .setType('AVRECEIVER')

  // Then we add the capabilities of the device
  .addButton({ name: 'POWER ON', label: 'On' })
  .addButton({ name: 'POWER OFF', label: 'Off' })
  .addButton({ name: 'INPUT 1' })
  .addButton({ name: 'INPUT 2' })
  .addButton({ name: 'INPUT 3' })
  .addButton({ name: 'INPUT 4' })

  .addButtonHander(controller.onButtonPressed);

function startSdkExample(brain) {
  console.log('- Start server');
  neeoapi.startServer({
    brain,
    port: 6336,
    name: 'octava-serial-controller',
    devices: [octavaController]
  })
  .then(() => {
    console.log('# READY! use the NEEO app to search for "Octava HD41ARC Serial Controller".');
  })
  .catch((error) => {
    //if there was any error, print message out to console
    console.error('ERROR!', error.message);
    process.exit(1);
  });
}

const brainIp = process.env.BRAINIP;
if (brainIp) {
  console.log('- use NEEO Brain IP from env variable', brainIp);
  startSdkExample(brainIp);
} else {
  console.log('- discover one NEEO Brain...');
  neeoapi.discoverOneBrain()
    .then((brain) => {
      console.log('- Brain discovered:', brain.name);
      startSdkExample(brain);
    });
}
