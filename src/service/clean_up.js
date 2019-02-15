var admin = require('firebase-admin');
var serviceAccount = require('./key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://raspberryeye-1804e.firebaseio.com"
});

// the number of hours back to keep
const hours = 4;

const db = admin.firestore();
let date = new Date();
date.setTime(date.getTime() - (hours * 60 * 60 * 1000));
var count = 0;
console.log(date.toISOString());

db.collection('events').orderBy('date', 'desc').startAfter(date).get()
    .then(function(snapshot) {
        var batch = db.batch();
        snapshot.forEach(function(doc) {
            batch.delete(doc.ref);
            console.log('Deleting: ' + doc.data().date.toDate());
            count++;
        });

        return batch.commit();
    })
    .then(function() {
        console.log('Clean up of ' + count + ' records done');
    });
