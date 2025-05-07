import { db, collection, getDocs, query, orderBy, limit } from "./firebase.js";

// Initialization
let rank = 1;

// Admin's ID list
const admin = [
	"jUfXLiPKZIbgQmmdmWMzFcGh5fw2",
];

async function loadLeaderboard() {

	const playersRef = collection(db, "players");
	const q = query(playersRef, orderBy("flagCount", "desc"), orderBy("timestamp", "asc")); 
	const querySnapshot = await getDocs(q);

	const tbody = document.querySelector("#leaderboard tbody");
	tbody.innerHTML = ""; // clear table

	// Scanning through each docs in the snapshot
	querySnapshot.forEach((doc) => {
		const data = doc.data();
		const docid = doc.id;
		let name = data.Name;
		
		const row = document.createElement("tr");

		// If user (document) is admin
		if (admin.includes(docid)) {
			name = `${data.Name} (Admin)`;
			row.innerHTML = `
			<th></th>
			<th>${name}</th>
			<th>${data.flagCount || 0}</th>
			`;
			tbody.appendChild(row);
		} else { // Adding entries into the table 
			row.innerHTML = `
			<th>${rank++}</th>
			<th>${name}</th>
			<th>${data.flagCount || 0}</th>
			`;
			tbody.appendChild(row);
		}
	});
}

document.addEventListener("DOMContentLoaded", loadLeaderboard);