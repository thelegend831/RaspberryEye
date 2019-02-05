var Gpio = require('onoff').Gpio;
var config = require('./config');
var path = require('path');
var exec = require('child_process').exec;

// Setup the motion detection to work on GPIO pin 17
//var sensor = new Gpio(17, 'in', 'both');

// sensor.watch(function (err, value) {
//     if (err) { 
//       console.error('There was an error', err);
//     return;
//     }
    
//     if (value) {
//         handleMotionDetection()
//     }
//   });

function handleMotionDetection() {
    //var fileName = captureImage();
    var fileName = '1549380960916.jpg'
    
    // upload files to firebase
    uploadImage(fileName);
}

function captureImage() {
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
    })   

    return fileName;    
}

function uploadImage(fileName) {

}

function createDocument() {

}

function unexportOnClose() {
    sensor.unexport();
};

// TEST CODE
handleMotionDetection();
  
//process.on('SIGINT', unexportOnClose);