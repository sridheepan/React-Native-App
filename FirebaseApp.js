// import the firebase project keys
import firebaseConfig from "./config/firebase-keys"

// other imports from firebase libraries
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const firebaseApp = initializeApp(firebaseConfig);

// firebase db service
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
