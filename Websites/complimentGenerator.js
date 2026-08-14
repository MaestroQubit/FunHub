document.addEventListener("DOMContentLoaded", () => {
  const compliments = [
    "You bring a great vibe wherever you go.",
    "Your consistency is your superpower.",
    "You make difficult things look easy.",
    "Your creativity stands out every time.",
    "You are improving faster than you think.",
    "Your focus is seriously inspiring."
  ];

  const text = document.getElementById("complimentText");
  const button = document.getElementById("generateCompliment");

  button.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    text.textContent = compliments[randomIndex];
  });
});
