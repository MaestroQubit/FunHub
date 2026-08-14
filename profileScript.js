document.addEventListener("DOMContentLoaded", () => {
  const profile = window.FunHubStorage?.getPlayerProfile?.() || {
    name: localStorage.getItem("playerName") || "",
    rollNo: localStorage.getItem("playerRollNo") || "",
    age: localStorage.getItem("playerAge") || ""
  };

  document.getElementById("profileName").textContent = profile.name || "Not set";
  document.getElementById("profileRoll").textContent = profile.rollNo || "Not set";
  document.getElementById("profileAge").textContent = profile.age || "Not set";

  const history = getHistory();
  const tableBody = document.getElementById("historyTable");

  tableBody.innerHTML = "";
  if (history.length === 0) {
    const row = document.createElement("tr");
    const emptyCell = document.createElement("td");
    emptyCell.colSpan = 3;
    emptyCell.textContent = "No games played yet.";
    row.appendChild(emptyCell);
    tableBody.appendChild(row);
  } else {
    history.slice().reverse().forEach((record) => {
      const row = document.createElement("tr");
      const gameCell = document.createElement("td");
      const dateCell = document.createElement("td");
      const scoreCell = document.createElement("td");

      gameCell.textContent = record.game || "Unknown";
      dateCell.textContent = record.date || "-";
      scoreCell.textContent = String(record.score ?? "-");

      row.append(gameCell, dateCell, scoreCell);
      tableBody.appendChild(row);
    });
  }

  document.getElementById("totalGames").textContent = String(history.length);
  document.getElementById("bestScore").textContent = getBestNumericScore(history);
});

function getHistory() {
  try {
    const history = window.FunHubStorage?.getGameHistory?.() || JSON.parse(localStorage.getItem("gameHistory") || "[]");
    return Array.isArray(history) ? history : [];
  } catch {
    return [];
  }
}

function getBestNumericScore(history) {
  const numericScores = history
    .map((item) => Number(item.score))
    .filter((score) => Number.isFinite(score));

  if (numericScores.length === 0) {
    return "Not set";
  }

  return String(Math.max(...numericScores));
}