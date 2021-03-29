import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD8-FrX8O851eujL5Lr4hLxU_4x5tioGIU",
    authDomain: "shwetflix-v2.firebaseapp.com",
    projectId: "shwetflix-v2",
    storageBucket: "shwetflix-v2.appspot.com",
    messagingSenderId: "590466614286",
    appId: "1:590466614286:web:af201f7b990c22a23d685f",
    measurementId: "G-QV39N97ZCH"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();



export default db;
export { auth ,googleProvider ,facebookProvider};