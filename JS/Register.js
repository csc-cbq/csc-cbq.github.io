import { auth, signInWithPopup, provider, onAuthStateChanged, signOut } from "./firebase.js"; // Import Firestore instance

// Check login
const loginBtn = document.getElementById("login-btn");

onAuthStateChanged(auth, (user) => {
	if (user) {
		loginBtn.textContent = `${user.displayName || "User"} | Log out`;
		loginBtn.onclick = () => {
			signOut(auth).then(() => {
				loginBtn.textContent = "Login";
				location.reload(); // hoặc cập nhật lại UI theo cách khác
			});
		};
	} else {
		loginBtn.addEventListener("click", async () => {
			try {
				const result = await signInWithPopup(auth, provider);
				const user = result.user;
				alert(`✅ Đăng nhập thành công: ${user.displayName}`);
				// Redirect hoặc lưu info gì đó

			} catch (error) {
				console.error("❌ Lỗi đăng nhập:", error);
				alert("Có lỗi xảy ra khi đăng nhập!");
			}
		});
	}
});