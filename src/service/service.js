var Gpio = require('onoff').Gpio;
var config = require('./config');
var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs');
var admin = require('firebase-admin');
var serviceAccount = require('./key.json');

// Setup the motion detection to work on GPIO pin 17
var sensor = new Gpio(17, 'in', 'both');

sensor.watch(function (err, value) {
   if (err) { 
     console.error('There was an error', err);
   return;
   }
  
   if (value) {
       handleMotionDetection()
   }
});

function handleMotionDetection() {
    var fileName = captureImage(uploadImage);
}

function captureImage(callback) {
    var fileName = Date.now() + config.ffmpeg.framesExt;
    var cmd = 'ffmpeg -y -i rtsp://' 
            + config.camera.username 
            + ':' 
            + config.camera.password 
            + '@' 
            + config.camera.ip 
            + '/Streaming/channels/' 
            + config.camera.channel 
            + ' -vframes ' 
            + config.ffmpeg.framesCount + ' ' 
            + path.join(path.resolve(), config.ffmpeg.framesDirectory) 
            + '/' 
            + fileName;
    
    console.log('Executing command: ' + cmd);

    exec(cmd, function(err, stdout, stderr) {
        if (err) {
            console.error(err);
            return;
        }

        console.log(fileName + ' Captured');
	
	callback(fileName);
    });
}

function uploadImage(fileName) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://raspberryeye-1804e.firebaseio.com"   
    });

    console.log('Admin init done');

    const db = admin.firestore();
    var fileContents = base64_encode('./frames/' + fileName);
    
    console.log('File Contents collected');
    //var timeStamp = new Date().toISOString();
    db.collection('events').doc(fileName).set({
        date: new Date(),
	image: fileContents,
	sensor: 'front'
    });

    console.log('Record has been added to the collection.');
}

function unexportOnClose() {
    sensor.unexport();
};

function base64_encode(fileName) {
    return fs.readFileSync(fileName, { encoding: 'base64' });
}
  
process.on('SIGINT', unexportOnClose);
