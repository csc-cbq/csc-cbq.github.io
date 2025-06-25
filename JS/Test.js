import {
    db, getDoc, increment, updateDoc, collection,
    addDoc, doc, setDoc, query, where, getDocs
} from "./firebase.js";
import { auth, signInWithPopup, provider, onAuthStateChanged } from "./firebase.js";


// All valid Hashes
const validHashes = [
    "d211166d3a400d9a02f57c16f7c11b6f4545241e1238cff5136b5c627ac7e590",
    "c6c3ff5b834b3d535bd865f808479e2911a1fb9d1eeddab0929017eccc1ad816",
    "f390f016e8dc3cfc4bbad046894397771e121055e5764d7948af1d823887dea4",
    "ca54cdca8e436ab497cc5dab391f48cf1329d8ce3e4d5821827f7d714b2acba3",
    "d0e2b42a957c1ee0b0b69a4a12fc86250259579e9d912a19b86df009161d8219",
    "fcc43a667f0c19ba779a3b21fd60417f871fcee058e09b2286e8904b427a09b8",
    "5a9e9ffbf02d71f3d9b8cd080bd33126a50ce4592869ee5881626e303208f7ad",
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
    const playerRef = doc(db, "players", user.uid);
    const flagCoRef = collection(playerRef, "flag_collection");
    const flags = flagCoRef.size

    // Check if the playerCode already exists in the flag collection
    const q = query(flagCoRef, where("code", "==", playerCode));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        alert("❌ You have already submitted this flag!");
    } else {
        try {
            if (!validHashes.includes(playerCode)) {
                alert("❌ Invalid code. Try again!");
                return;
            }

            // Adding the flag into flag_collection 
            const docRef = await addDoc(flagCoRef, {
                code: playerCode,
                timestamp: new Date()
            });

            // Counting flags
            const docSnap = await getDoc(playerRef);
            if (docSnap.exists()) {
                await updateDoc(playerRef, {
                    Name: user.displayName,
                    flagCount: flags,
                    timestamp: new Date(),
                });
            } else { // In case flagCount field didn't exist
                await setDoc(playerRef, {
                    Name: user.displayName,
                    flagCount: 1,
                    timestamp: new Date(),
                });
            }

            alert("✅ Submitted!");
            document.getElementById("pForm").reset(); // Clear form

        } catch (error) { // Catching unexpected error
            console.error("❌ Submission failed:", error);
            alert(`⚠️ An error occurred during submission:\n${error.message}`);
        }
    }
};

// Main execution
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("pForm").addEventListener("submit", async (event) => {
        event.preventDefault(); // Stop page refresh

        let user = auth.currentUser
        console.log(user)
        onAuthStateChanged(auth, async (fuser) => {
            if (fuser) {
                console.log("✅ Logged in as:", fuser.uid);
                submitFlag(fuser); // or do anything that needs UID here
            } else {
                alert("Please sign in to proceed!");
                try {
                    const result = await signInWithPopup(auth, provider);
                    submitFlag(result.user); // this guarantees result.user is non-null
                } catch (err) {
                    console.error("❌ Sign-in failed:", err);
                }
            }
        });
    });
});

// Export
export { auth }

