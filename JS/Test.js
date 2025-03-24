import { db } from "./firebase.js"; // Import Firestore instance
https://console.firebase.google.com/u/0/
console.log("Firestore is ready:", db);

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("Form").addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the page from reloading
        const player = document.getElementById("name").value;
        const answer = document.getElementById("code").value;

        // if
        if (answer == ) {
            const docRef = await addDoc(collection(db, "players"), {
                testee: player,
                level_1: answer,
                timestamp: new Date()
            });

            alert(`Submitted!`);
            document.getElementById("FlagCf").reset(); // Clear the form
        } else {
            console.log("The code wasn't right.");
        }
    });
});