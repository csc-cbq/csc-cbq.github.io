import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { form } from "./app.js";

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    https: //console.firebase.google.com/u/0/
    playerName = document.getElementById("Name").value;
    playerClass = document.getElementById("Class").value;

    try {
        await addDoc(collection(db, "players"), {
            name: playerName,
            class: playerClass,
            timestamp: new Date()
        }); http: //127.0.0.1:8080/
        alert("Player registered!");
        form.reset();
    } catch (error) {
        console.error("Error adding document: ", error);
    }
});
