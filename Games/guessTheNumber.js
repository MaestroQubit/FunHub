document.addEventListener("DOMContentLoaded", () => {
  const target = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;

  document.getElementById("submitGuess").addEventListener("click", () => {
    const guess = parseInt(document.getElementById("guessInput").value);
    attempts++;

    if (guess === target) {
      alert(`Correct! You guessed in ${attempts} attempts.`);
      saveGameResult("Guess the Number", attempts);
    } else if (guess < target) {
      alert("Guess a higher number!");
    } else {
      alert("Guess a lower number!");
    }
  });
});
