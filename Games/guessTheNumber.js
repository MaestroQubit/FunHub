document.addEventListener("DOMContentLoaded", () => {
  const guessInput = document.getElementById("guessInput");
  const submitButton = document.getElementById("submitGuess");
  const resetButton = document.getElementById("resetGuessGame");
  const resultText = document.getElementById("guessResult");
  const attemptsText = document.getElementById("guessAttempts");

  const maxAttempts = 10;
  let target = 0;
  let attempts = 0;
  let gameOver = false;

  function updateAttempts() {
    attemptsText.textContent = `Attempts left: ${maxAttempts - attempts}`;
  }

  function resetGame() {
    target = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    gameOver = false;

    guessInput.value = "";
    guessInput.disabled = false;
    submitButton.disabled = false;
    resultText.textContent = "Game started. Try to crack the number!";
    updateAttempts();
  }

  function finishGame(message, score) {
    gameOver = true;
    guessInput.disabled = true;
    submitButton.disabled = true;
    resultText.textContent = message;

    if (window.saveGameResult) {
      const profile = window.FunHubStorage?.getPlayerProfile?.();
      window.saveGameResult("Guess The Number", score, {
        playerName: profile?.name || "Player"
      });
    }
  }

  function handleGuess() {
    if (gameOver) return;

    const guess = Number(guessInput.value);
    if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
      resultText.textContent = "Enter a valid whole number between 1 and 100.";
      return;
    }

    attempts += 1;
    updateAttempts();

    if (guess === target) {
      const score = Math.max(1, maxAttempts - attempts + 1);
      finishGame(`Perfect! ${guess} is correct.`, score);
      return;
    }

    if (attempts >= maxAttempts) {
      finishGame(`Out of attempts. The number was ${target}.`, 0);
      return;
    }

    resultText.textContent = guess < target ? "Too low. Try a bigger number." : "Too high. Try a smaller number.";
  }

  submitButton.addEventListener("click", handleGuess);
  resetButton.addEventListener("click", resetGame);
  guessInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleGuess();
    }
  });

  resetGame();
});
