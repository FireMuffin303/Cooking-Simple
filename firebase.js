import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";



const firebaseConfig = {

    apiKey: "AIzaSyBo6mJMR1AoPq2ffLpTfX8nqVM0rei0Mm0",

    authDomain: "cookingsimple-b21fa.firebaseapp.com",

    databaseURL: "https://cookingsimple-b21fa-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId: "cookingsimple-b21fa",

    storageBucket: "cookingsimple-b21fa.appspot.com",

    messagingSenderId: "519579073112",

    appId: "1:519579073112:web:b45adc95e5aa92f6e0a82d",

    measurementId: "G-0ZQCHLTT3E"

  };

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);

