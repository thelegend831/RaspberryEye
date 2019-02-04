import admin from 'firebase-admin';
import serviceAccount from './key.json';
import fs from 'fs';
import path from 'path';


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://raspberryeye-1804e.firebaseio.com"
  });


const bucket = admin.storage().bucket();
//var ref = admin.storage().ref();

// var task = ref.put(file);

// task.on('state_change', (snapshot) => {
//   var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
//   console.log(percentage);
// }, (error) => {
//   console.error(error);
// }, () => {
//   console.log('Upload finished');
// });

//https://www.youtube.com/watch?v=Z87OZtIYC_0&list=PLnepGR_yu2ekWVHK_PEXGBv3TxFDOrSLs&index=5
