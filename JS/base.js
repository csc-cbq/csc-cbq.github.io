document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".toggle-btn").addEventListener("click", () => {
        document.getElementById("navLinks").classList.toggle("show");
        document.getElementById("nav-overlay").classList.toggle("show");
    });
});