import * as firebase from 'firebase';

let config = {
  apiKey: "AIzaSyCj_1yARIRd7eFkZYQBityynJCh3mBSYGU",
  authDomain: "pokergoit.firebaseapp.com",
  databaseURL: "https://pokergoit.firebaseio.com",
  projectId: "pokergoit",
  storageBucket: "pokergoit.appspot.com",
  messagingSenderId: "127270927002"
};

firebase.initializeApp(config);

export const storage = firebase.storage();

export const storageRef = firebase.storage().ref();

export const userpicRef = storageRef.child('userpics');

export default firebase;
