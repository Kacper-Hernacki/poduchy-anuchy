import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyADA_c3n7vmsB0IiH7BeOFTk2PRqFWaQ7k',
  authDomain: 'poduchy-anuchy.firebaseapp.com',
  projectId: 'poduchy-anuchy',
  storageBucket: 'poduchy-anuchy.appspot.com',
  messagingSenderId: '357639438990',
  appId: '1:357639438990:web:3c62f95093411bba527fdf',
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage, firebase };
