// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQho9NHqk9Szim8Dd2VT5H5gzwl1SecJ8",
  authDomain: "trendifymart.firebaseapp.com",
  projectId: "trendifymart",
  storageBucket: "trendifymart.appspot.com", // ✅ sahi
  messagingSenderId: "291098624607",
  appId: "1:291098624607:web:4ade4270793dad7ebd11ea",
  measurementId: "G-5TJ3N4WK04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // <-- Yeh line zaroor honi chahiye
export const db = getFirestore(app);