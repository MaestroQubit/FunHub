document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("playerInfoForm");

    form.addEventListener("submit", (event) => {
        const name = document.getElementById("playerName").value;
        const roll = document.getElementById("playerRollNo").value;
        const age = document.getElementById("playerAge").value;

        localStorage.setItem("playerName", name);
        localStorage.setItem("playerRollNo", roll);
        localStorage.setItem("playerAge", age);

        alert("Player info saved! Go to Profile Page to view.");
    });
});