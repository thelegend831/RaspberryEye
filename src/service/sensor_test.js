var Gpio = require('onoff').Gpio;

console.log('Setting up GPIO Pin 17');
var sensor = new Gpio(17, 'in', 'both');
console.log('Pin 17 setup');

console.log('Watching pin 17 for changes');
sensor.watch(function (err, value) {
    if (err) { 
      console.error('There was an error', err);
    return;
    }
    
    console.log('GPIO Pin 17 Change detected: ' + value);
  });

function unexportOnClose() {
    sensor.unexport();
}

process.on('SIGINT', unexportOnClose);

