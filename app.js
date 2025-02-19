import { db } from "./firebase.js"; // Import Firestore instance
https://console.firebase.google.com/u/0/
console.log("Firestore is ready:", db);

//Adding form-data to db
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

    document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("playerForm").addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the page from reloading
        const playerName = document.getElementById("Name").value;
        const playerClass = document.getElementById("Class").value;

        try {
            const docRef = await addDoc(collection(db, "players"), {
                name: playerName,
                class: playerClass,
                timestamp: new Date()
            });

            alert(`✅ Registered successfully! Your Player ID: ${docRef.id}`);
            document.getElementById("playerForm").reset(); // Clear the form
        } catch (error) {
            console.error("Error adding player: ", error);
            alert("❌ Failed to register. Try again!");
        }
    });
    });

//Counting-down
var countDownDate = new Date("April 20, 2025 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // Get today's date and time
    var now = new Date().getTime();

    //Distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result
    document.getElementById("timer").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    // Show the link when countdown expired
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = 'The event has <a href="start.html" target="_blank">start</a>ed!';
    }
}, 1000);

