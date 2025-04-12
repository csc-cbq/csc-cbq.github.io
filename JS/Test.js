import { db } from "./firebase.js"; // Import Firestore instance
import { increment, updateDoc, collection, addDoc, doc, setDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
console.log("Firestore is ready:", db);

const validHashes = [
    "d211166d3a400d9a02f57c16f7c11b6f4545241e1238cff5136b5c627ac7e590",
    "c6c3ff5b834b3d535bd865f808479e2911a1fb9d1eeddab0929017eccc1ad816",
    "f390f016e8dc3cfc4bbad046894397771e121055e5764d7948af1d823887dea4",
    "ca54cdca8e436ab497cc5dab391f48cf1329d8ce3e4d5821827f7d714b2acba3"
];

// Hashing Func
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

        // Input
        const playerName = document.getElementById("pName").value;
        const playerCode = await hashString(document.getElementById("pCode").value);

        // Player Collection
        const playerRef = doc(db, "players", playerName);
        const flagCoRef = collection(playerRef, "flag_collection"); 

        // Check if the playerCode already exists in the flag collection
        const q = query(flagCoRef, where("code", "==", playerCode));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            alert("❌ You have already submitted this flag!");
        } else {
            if (validHashes.includes(playerCode)) {
                
                const docRef = await addDoc(flagCoRef, {
                    code: playerCode,
                    timestamp: new Date()
                }, { merge: true });

                await updateDoc(playerRef, {
                    flagCount: increment(1)
                });

                alert(`✅ Submitted! Your ID: ${docRef.id}`);
                document.getElementById("pForm").reset(); // Clear form
            } else {
                alert("❌ Failed to submit. Try again!");
            }
        }
    });
});
