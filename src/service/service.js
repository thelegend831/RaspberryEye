#!/usr/bin/env node

var Gpio = require('onoff').Gpio;
var config = require('./config');
var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs');
var admin = require('firebase-admin');
var serviceAccount = require('./key.json');

// Setup the debounce flag
var monitoring = true;

// Admin firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://raspberryeye-1804e.firebaseio.com"
});

console.log('Admin init done');

// Setup the motion detection to work on GPIO pin 17
var sensor = new Gpio(17, 'in', 'both');

console.log('Gpio init done');

sensor.watch(function (err, value) {
    if (err) {
        console.error('There was an error', err);
        return;
    }

    if (value && monitoring) {
        
        // Toggle the flag off 
        monitoring = false;

        // start the debounce timer
        setTimeout(function() {
            monitoring = true;
        }, config.process.debounce);

        captureImage(uploadImage);
    }
});

function captureImage(callback) {
    var fileName = Date.now() + config.ffmpeg.framesExt;
    var cmd = 'ffmpeg -y -i rtsp://' +
        config.camera.username +
        ':' +
        config.camera.password +
        '@' +
        config.camera.ip +
        '/Streaming/channels/' +
        config.camera.channel +
        ' -vframes ' +
        config.ffmpeg.framesCount + ' ' +
        path.join(path.resolve(), config.ffmpeg.framesDirectory) +
        '/' +
        fileName;

    //console.log('Executing command: ' + cmd);
    console.log('Executing FFMPEG Command');

    exec(cmd, function (err, stdout, stderr) {
        if (err) {
            console.error(err);
            return;
        }

        console.log(fileName + ' Captured');

        callback(fileName);
    });
}

function uploadImage(fileName) {
    
    const db = admin.firestore();
    var fileContents = base64_encode('./frames/' + fileName);

    console.log('File Contents converted to base64');

    db.collection('events').doc(fileName).set({
        date: new Date(),
        image: fileContents,
        sensor: 'front'
    })
    .then(function() {
    	console.log('Record written to the database, we can now delete the file');
	
	fs.unlink('./frames/' + fileName, function(err) {
	    if (err) {
		console.log('There was an error deleting the file: ' + fileName + ' -> ' + err);
	    }
	    else {
	        console.log(fileName + ' deleted');
	    }
	});

    })
    .catch(function(error) {
    	console.log('An error occured saving the file to the database: ' + error);
    });
}

function base64_encode(fileName) {
    return fs.readFileSync(fileName, {
        encoding: 'base64'
    });
}

function unexportOnClose() {
    sensor.unexport();
};

// Clean up on exit
process.on('SIGINT', unexportOnClose);
