// JavaScript source code
import { db } from "./firebase.js"; // Import Firestore instance
console.log("Firestore is ready:", db);

//Adding flags to db
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("FlagCf").addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the page from reloading
        const playerFlag = document.getElementById("Flag").value;


        // if
        try {
            const docRef = await addDoc(collection(db, "players"), {
                flag: playerFlag,
                timestamp: new Date()
            });

            alert(`✅ Valid flag!`);
            document.getElementById("FlagCf").reset(); // Clear the form
        } catch (error) {
            alert("❌ Invalid flag!");
        }
    });
});