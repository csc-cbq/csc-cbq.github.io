import { db, collection, getDocs, query, orderBy, limit } from "./firebase.js";


async function loadLeaderboard() {

    const playersRef = collection(db, "players");
    const q = query(playersRef, orderBy("flagCount", "desc"), orderBy("timestamp", "desc")); 
    const querySnapshot = await getDocs(q);

    const tbody = document.querySelector("#leaderboard tbody");
    tbody.innerHTML = ""; // clear table

    let rank = 1;
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        let name = data.Name
        if (name === "Sơn Nguyễn") {
            name = `${data.Name} (Admin)`
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

