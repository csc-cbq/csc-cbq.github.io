import { db } from "./firebase.js"; // Import Firestore instance
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
console.log("Firestore is ready:", db);


//Register
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("pForm").addEventListener("submit", async (event) => {
        event.preventDefault(); // Stop page refresh

        const playerName = document.getElementById("pName").value;
        const playerCode = document.getElementById("pCode").value;

        try {
            const docRef = await addDoc(collection(db, "players"), {
                name: playerName,
                email: playerCode,
                timestamp: new Date()
            });

            alert(`✅ Submitted! Your ID: ${docRef.id}`);
            document.getElementById("pForm").reset(); // Clear form
        } catch (error) {
            console.error("Error:", error);
            alert("❌ Failed to submit. Try again!");
        }
    });
});