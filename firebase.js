// Firebase SDK (for GitHub Pages)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

// Export Firestore if needed
export { db };