document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("playerName");
  const roll = localStorage.getItem("playerRollNo");
  const age = localStorage.getItem("playerAge");

  document.getElementById("profileName").textContent = name || "Not set";
  document.getElementById("profileRoll").textContent = roll || "Not set";
  document.getElementById("profileAge").textContent = age || "Not set";
});
