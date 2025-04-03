import { db } from "./firebase.js"; // Import Firestore instance
import { collection, addDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
console.log("Firestore is ready:", db);

const validHashes = [
    "d211166d3a400d9a02f57c16f7c11b6f4545241e1238cff5136b5c627ac7e590",
    "c6c3ff5b834b3d535bd865f808479e2911a1fb9d1eeddab0929017eccc1ad816",
    "f390f016e8dc3cfc4bbad046894397771e121055e5764d7948af1d823887dea4",
    "ca54cdca8e436ab497cc5dab391f48cf1329d8ce3e4d5821827f7d714b2acba3"
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
        const playerCode = await hashString(document.getElementById("pCode").value);

        if (validHashes.includes(playerCode)) {
            const docRef = doc(db, "players", playerName); // Use playerName as the document ID
            await setDoc(docRef, {
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
