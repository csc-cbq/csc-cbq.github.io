// Firebase SDK (for GitHub Pages)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import {
    orderBy, limit, getFirestore, getDoc, increment, updateDoc,
    collection, addDoc, doc, setDoc, query, where, getDocs
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";


// Firebase configuration
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
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


// Export Firestore and Authentication
export { signOut, auth, onAuthStateChanged, signInWithPopup, provider };
export {
    db, getDoc, increment, updateDoc, collection, addDoc,
    doc, setDoc, query, where, getDocs, orderBy, limit
};