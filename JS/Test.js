import { db } from "./firebase.js"; // Import Firestore instance
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
console.log("Firestore is ready:", db);

const validHashes = [
    "d211166d3a400d9a02f57c16f7c11b6f4545241e1238cff5136b5c627ac7e590",
    "c6c3ff5b834b3d535bd865f808479e2911a1fb9d1eeddab0929017eccc1ad816"
];

async function hashString(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("pForm").addEventListener("submit", async (event) => {
        event.preventDefault(); // Stop page refresh

        const playerName = document.getElementById("pName").value;
        const playerCode = hashString(document.getElementById("pCode").value);

        if (validHashes.includes(playerCode)) {
            const docRef = await addDoc(collection(db, "players", playerName), {
                code: playerCode,
                timestamp: new Date()
            });

            alert(`✅ Submitted! Your ID: ${docRef.id}`);
            document.getElementById("pForm").reset(); // Clear form
        } else {
            alert("❌ Failed to submit. Try again!");
        }
    });
});
