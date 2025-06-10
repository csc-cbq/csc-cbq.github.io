// JavaScript source code
import { db } from "./firebase.js"; // Import Firestore instance
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
console.log("Firestore is ready:", db);

//Adding flags to db

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("playerForm").addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the page from reloading
        const playerFlag = document.getElementById("FlagCf").value;


        // if
        try {
            const docRef = await addDoc(collection(db, "players"), {
                flag: playerFlag,
                timestamp: new Date()
            });

            alert(`✅ Valid flag!`);
            document.getElementById("FlagCf").reset(); // Clear the form
        } catch (error) {
            console.log("❌ Invalid flag!", error);
        }
    });
});