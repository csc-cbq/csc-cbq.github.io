import { auth, signInWithPopup, provider, onAuthStateChanged, signOut } from "./firebase.js"; // Import Firestore instance

// Check login
const loginBtn = document.getElementById("login-btn");

onAuthStateChanged(auth, (user) => {
    if (user) {
        loginBtn.textContent = `${user.displayName || "User"} | Log out`;
        loginBtn.onclick = () => {
            signOut(auth).then(() => {
                loginBtn.textContent = "Login";
                // Không cần reload nếu cập nhật UI đủ tốt
                // location.reload();
            });
        };
    } else {
        loginBtn.textContent = "Login";
        loginBtn.onclick = async () => {
            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
            } catch (error) {
                console.error("❌ Lỗi đăng nhập:", error);
            }
        };
    }
});