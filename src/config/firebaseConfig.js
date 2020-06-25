import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCw-qazBcnhNlBoyEG-oJKyujW4b_U9c4E",
  authDomain: "how-much-you-know-me.firebaseapp.com",
  databaseURL: "https://how-much-you-know-me.firebaseio.com",
  projectId: "how-much-you-know-me",
  storageBucket: "how-much-you-know-me.appspot.com",
  messagingSenderId: "290107085241",
  appId: "1:290107085241:web:13880e758a03fe46232668",
  measurementId: "G-VY1ZJ4Q6WK"
};


firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const storage = firebase.storage().ref();
const db = firebase.database();
export { db, auth, storage, firebase };