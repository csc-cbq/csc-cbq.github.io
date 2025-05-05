import { db, collection, getDocs, query, orderBy, limit } from "./firebase.js";

// Admin's ID list
const admin = [
	"jUfXLiPKZIbgQmmdmWMzFcGh5fw2",
];

async function loadLeaderboard() {

	const playersRef = collection(db, "players");
	const q = query(playersRef, orderBy("flagCount", "desc"), orderBy("timestamp", "desc")); 
	const querySnapshot = await getDocs(q);

	const tbody = document.querySelector("#leaderboard tbody");
	tbody.innerHTML = ""; // clear table

	// Scanning through each docs in the snapshot
	querySnapshot.forEach((doc) => {
		const data = doc.data();
		const docid = doc.id;
		let name = data.Name;
		let rank = 1;

		// If user (document) is admin
		if (admin.includes(docid)) {
			name = `${data.Name} (Admin)`;
			rank = 0;
		}

		// Adding entries into the table
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