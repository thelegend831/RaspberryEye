import admin from 'firebase-admin';

var serviceAccount = require("private/raspberryeye-1804e-firebase-adminsdk-0v02x-b0f7994bbd.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://raspberryeye-1804e.firebaseio.com"
  });
