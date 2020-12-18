import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/database'

/* personal Firebase config. Just for testing
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
*/

//team firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDKYROXeQGUI2iPpcjoAlfKzu1WCTvrCBw",
  authDomain: "workshop-2-cc6c6.firebaseapp.com",
  databaseURL: "https://workshop-2-cc6c6.firebaseio.com",
  projectId: "workshop-2-cc6c6",
  storageBucket: "workshop-2-cc6c6.appspot.com",
  messagingSenderId: "579430010109",
  appId: "1:579430010109:web:05b612bc8d766ec6b88294",
  measurementId: "G-NJX9CRK044"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };