
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDE5LylA7DSMSzuAdS5lJHxdf71alLk-QM",
    authDomain: "gothic-welder-423413-g4.firebaseapp.com",
    projectId: "gothic-welder-423413-g4",
    storageBucket: "gothic-welder-423413-g4.appspot.com",
    messagingSenderId: "542512658501",
    appId: "1:542512658501:web:9a29e704dd60efb48c4b2c",
    measurementId: "G-D14VD727XN"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
