import { db } from "./firebase.js"; // Import Firestore instance
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
console.log("Firestore is ready:", db);


//Register
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("playerForm").addEventListener("submit", async (event) => {
        event.preventDefault(); // Stop page refresh

        const playerName = document.getElementById("playerName").value;
        const playerEmail = document.getElementById("playerEmail").value;

        try {
            const docRef = await addDoc(collection(db, "players"), {
                name: playerName,
                email: playerEmail,
                timestamp: new Date()
            });

            alert(`✅ Registered! Your ID: ${docRef.id}`);
            document.getElementById("playerForm").reset(); // Clear form
        } catch (error) {
            console.error("Error:", error);
            alert("❌ Failed to register. Try again!");
        }
    });
});