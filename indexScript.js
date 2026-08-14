document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("playerForm");
    const nameInput = document.getElementById("playerName");
    const rollInput = document.getElementById("playerRollNo");
    const ageInput = document.getElementById("playerAge");
    const leaderboardBody = document.getElementById("leaderboardBody");

    const profile = window.FunHubStorage?.getPlayerProfile?.() || {
        name: localStorage.getItem("playerName") || "",
        rollNo: localStorage.getItem("playerRollNo") || "",
        age: localStorage.getItem("playerAge") || ""
    };

    nameInput.value = profile.name;
    rollInput.value = profile.rollNo;
    ageInput.value = profile.age;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const roll = rollInput.value.trim();
        const age = ageInput.value.trim();

        if (!name || !roll || !age) {
            alert("Please fill all player details.");
            return;
        }

        if (window.FunHubStorage?.setPlayerProfile) {
            window.FunHubStorage.setPlayerProfile({ name, rollNo: roll, age });
        } else {
            localStorage.setItem("playerName", name);
            localStorage.setItem("playerRollNo", roll);
            localStorage.setItem("playerAge", age);
        }

        alert("Player details saved successfully.");
    });

    renderLeaderboard(leaderboardBody);
});

function readHistory() {
    try {
        const history = window.FunHubStorage?.getGameHistory?.() || JSON.parse(localStorage.getItem("gameHistory") || "[]");
        return Array.isArray(history) ? history : [];
    } catch {
        return [];
    }
}

function renderLeaderboard(leaderboardBody) {
    if (!leaderboardBody) return;

    const history = readHistory();
    const latestTen = history.slice(-10).reverse();
    const playerName = localStorage.getItem("playerName") || "Player";

    leaderboardBody.innerHTML = "";

    if (latestTen.length === 0) {
        const row = document.createElement("tr");
        const messageCell = document.createElement("td");
        messageCell.colSpan = 3;
        messageCell.textContent = "No game results yet. Play a game to get started!";
        row.appendChild(messageCell);
        leaderboardBody.appendChild(row);
        return;
    }

    latestTen.forEach((record) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = record.playerName || playerName;

        const gameCell = document.createElement("td");
        gameCell.textContent = record.game || "Unknown";

        const scoreCell = document.createElement("td");
        scoreCell.textContent = String(record.score ?? "-");

        row.append(nameCell, gameCell, scoreCell);
        leaderboardBody.appendChild(row);
    });
}