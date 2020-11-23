import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyDB0RNnAaWYekvRuHqCBigUZLyVMfjGN34",
  authDomain: "react-native-firebase-d7ca7.firebaseapp.com",
  databaseURL: "https://react-native-firebase-d7ca7.firebaseio.com",
  projectId: "react-native-firebase-d7ca7",
  storageBucket: "react-native-firebase-d7ca7.appspot.com",
  messagingSenderId: "709211461850",
  appId: "1:709211461850:web:0f7b632525101e3f382de3",
  measurementId: "G-DYWSDRPESP"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };