// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyClkjOZm1z1KYk0pE6YS7Hkp594khY5eyY",
    authDomain: "samuel-mybrand.firebaseapp.com",
    databaseURL: "https://samuel-mybrand.firebaseio.com",
    projectId: "samuel-mybrand",
    storageBucket: "samuel-mybrand.appspot.com",
    messagingSenderId: "778293782239",
    appId: "1:778293782239:web:9e296067ba13bba6186b6a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let auth = firebase.auth();
let storage = firebase.storage();

