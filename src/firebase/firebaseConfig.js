// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbdzS9W7ed3YfIIGjMpBvshQNjdgq-S4Y",
  authDomain: "movie-9ce76.firebaseapp.com",
  projectId: "movie-9ce76",
  storageBucket: "movie-9ce76.firebasestorage.app",
  messagingSenderId: "628600888433",
  appId: "1:628600888433:web:72adc4ae31d5533f6ecfd0",
  measurementId: "G-P1LVFQ0T09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
