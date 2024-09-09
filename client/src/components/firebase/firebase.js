import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // Import Realtime Database if you're using it
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyANS2pWuEX-ZgR25QN1fXDZJhc3E2LAJmY",
    authDomain: "sih2024-8bb83.firebaseapp.com",
    projectId: "sih2024-8bb83",
    storageBucket: "sih2024-8bb83.appspot.com",
    messagingSenderId: "173807889355",
    appId: "1:173807889355:web:1e585ddcd660b9805ca44e",
    measurementId: "G-LZDL7GYGFP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const db = getDatabase(app);
const storage = getStorage(app);

export { app, auth, firestore, db, storage };