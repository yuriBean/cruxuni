// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvr_lESVckxd_cggg09DVFxJwJfJFxCyY",
  authDomain: "nascon-421f6.firebaseapp.com",
  projectId: "nascon-421f6",
  storageBucket: "nascon-421f6.firebasestorage.app",
  messagingSenderId: "738237675456",
  appId: "1:738237675456:web:e6f65892fbccd839e7ba25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
