document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("playerName");
  const roll = localStorage.getItem("playerRollNo");
  const age = localStorage.getItem("playerAge");

  document.getElementById("profileName").textContent = name || "Not set";
  document.getElementById("profileRoll").textContent = roll || "Not set";
  document.getElementById("profileAge").textContent = age || "Not set";

  const history = JSON.parse(localStorage.getItem("gameHistory")) || [];
  const tableBody = document.getElementById("historyTable");

  history.forEach(record => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${record.game}</td><td>${record.date}</td><td>${record.score}</td>`;
    tableBody.appendChild(row);
  });

  document.getElementById("totalGames").textContent = history.length;
  document.getElementById("bestScore").textContent = history.length > 0
    ? Math.max(...history.map(r => r.score))
    : "Not set";

});