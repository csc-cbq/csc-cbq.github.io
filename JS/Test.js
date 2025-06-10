import { db, getDoc, increment, updateDoc, collection, addDoc, doc, setDoc, query, where, getDocs } from "./firebase.js";
import { auth, signInWithPopup, provider } from "./firebase.js";
console.log("Firestore is ready:", db);

// All valid Hashes
const validHashes = [
    "d211166d3a400d9a02f57c16f7c11b6f4545241e1238cff5136b5c627ac7e590",
    "c6c3ff5b834b3d535bd865f808479e2911a1fb9d1eeddab0929017eccc1ad816",
    "f390f016e8dc3cfc4bbad046894397771e121055e5764d7948af1d823887dea4",
    "ca54cdca8e436ab497cc5dab391f48cf1329d8ce3e4d5821827f7d714b2acba3",
    "d0e2b42a957c1ee0b0b69a4a12fc86250259579e9d912a19b86df009161d8219",
    "fcc43a667f0c19ba779a3b21fd60417f871fcee058e09b2286e8904b427a09b8"
];

// Hashing Function
async function hashString(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Submit-flag Function
async function submitFlag(user) {
    const playerCode = await hashString(document.getElementById("pCode").value);

    // Player Collection
    const playerRef = doc(db, "players", user.displayName);
    const flagCoRef = collection(playerRef, "flag_collection");

    // Check if the playerCode already exists in the flag collection
    const q = query(flagCoRef, where("code", "==", playerCode));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        alert("❌ You have already submitted this flag!");
    } else {
        if (validHashes.includes(playerCode)) {

            // Flag field
            const docRef = await addDoc(flagCoRef, {
                code: playerCode,
                timestamp: new Date()
            }, { merge: true });

            // Counting
            const docSnap = await getDoc(playerRef);
            if (docSnap.exists()) {
                await updateDoc(playerRef, {
                    flagCount: increment(1),
                    timestamp: new Date()
                });
            } else {
                await setDoc(playerRef, {
                    flagCount: 1
                });
            }


            alert(`✅ Submitted!`);
            document.getElementById("pForm").reset(); // Clear form
        } else {
            alert("❌ Failed to submit. Try again!");
        }
    }
};

// Main execution

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("pForm").addEventListener("submit", async (event) => {
        event.preventDefault(); // Stop page refresh

        user = auth.currentUser;

        if (!user) {
            // If not logged in, prompt login via popup
            alert("Please Sign in to proceed!")
            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;

                // Proceed with flag submission after successful login
                submitFlag(user);

            } catch (error) {
                console.error("❌ Error signing in:", error);
            }
        } else {
            // If already logged in, proceed with flag submission
            submitFlag(user);
        }
    });
});

// Export
export { auth }

