import admin from 'firebase-admin';
import serviceAccount from './key.json';
import storage from '@google-cloud/storage';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://raspberryeye-1804e.firebaseio.com"
  });


var buckets = storage.getBuckets();

console.log(buckets);

//const db = admin.firestore();

// Writing to the database
// db.collection('events').doc('test').set({
//   date: 'February 4, 2019 at 2:00:00 PM UTC',
//   image: 'www.google.com',
//   sensor: 'front'
// })


// reading from the database
// db.collection('events').get()
//   .then(snapshot => {
//     snapshot.forEach(doc => {
//       console.log(doc);
//     });
//   })
//   .catch(error => {
//     console.error(error);
//   })

//var childRef = stor.child('Hero.jpg');

//console.log(childRef);


//const bucket = admin.storage().bucket();
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
