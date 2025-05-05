import { db, collection, getDocs, query, orderBy, limit } from "./firebase.js";

const admin = [
"Sơn Nguyễn",
]

async function loadLeaderboard() {

    const playersRef = collection(db, "players");
    const q = query(playersRef, orderBy("flagCount", "desc"), orderBy("timestamp", "desc")); 
    const querySnapshot = await getDocs(q);

    const tbody = document.querySelector("#leaderboard tbody");
    tbody.innerHTML = ""; // clear table

    
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        let name = data.Name
        let rank = 1;

        if (admin.includes(name)) {
            name = `${data.Name} (Admin)`
            rank = 0
        }
        const row = document.createElement("tr");
        row.innerHTML = `
        <th>${rank++}</th>
        <th>${name}</th>
        <th>${data.flagCount || 0}</th>
        `;
        tbody.appendChild(row);
    });
}


document.addEventListener("DOMContentLoaded", loadLeaderboard);

