var admin = require('firebase-admin');
var serviceAccount = require('./key.json');
var fs = require('fs');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://raspberryeye-1804e.firebaseio.com"
  });

  // Base 64 encode image


const db = admin.firestore();

var fileContents = base64_encode('./data/test.png');

const title = new Date().toString();

db.collection('events').doc(title).set({
  date: title,
  image: fileContents,
  sensor: 'front'
})


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

function base64_encode(fileName) {
  return fs.readFileSync(fileName, { encoding: 'base64' });
}
