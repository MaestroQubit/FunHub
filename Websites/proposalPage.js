document.addEventListener("DOMContentLoaded", () => {
  const yesButton = document.getElementById("proposalYes");
  const noButton = document.getElementById("proposalNo");
  const result = document.getElementById("proposalResult");

  yesButton.addEventListener("click", () => {
    result.textContent = "Yay! Let us build awesome things together.";
  });

  noButton.addEventListener("mouseenter", () => {
    const top = Math.floor(Math.random() * 240) - 120;
    const left = Math.floor(Math.random() * 240) - 120;
    noButton.style.position = "relative";
    noButton.style.transform = `translate(${left}px, ${top}px)`;
  });

  noButton.addEventListener("click", () => {
    result.textContent = "No button says: try catching me first!";
  });
});
