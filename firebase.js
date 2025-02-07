// JavaScript source code
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIUb5OY303UJihgdQ_KRiWZAIwM0M7Hqw",
  authDomain: "csc-cbq.firebaseapp.com",
  projectId: "csc-cbq",
  storageBucket: "csc-cbq.firebasestorage.app",
  messagingSenderId: "534815915259",
  appId: "1:534815915259:web:8253eaace98430cef6845e",
  measurementId: "G-JFXJ0B9DF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);