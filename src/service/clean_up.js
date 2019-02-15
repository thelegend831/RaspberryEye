var admin = require('firebase-admin');
var serviceAccount = require('./key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://raspberryeye-1804e.firebaseio.com"
});

const db = admin.firestore();

const date = new Date() + 1;

db.collection('events').get()
    .then(function(snapshot) {
        snapshot.forEach(function(doc) {
            console.log(doc.data().Date);
        });
    })
    .then(function() {
        console.log('Clean up done');
    });