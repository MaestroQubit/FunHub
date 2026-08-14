document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("[data-rps-choice]");
    const resetButton = document.getElementById("resetRpsGame");
    const resultText = document.getElementById("rpsResult");
    const scoreText = document.getElementById("rpsScore");
    const roundText = document.getElementById("roundCount");

    const maxRounds = 7;
    let round = 0;
    let playerScore = 0;
    let computerScore = 0;

    function resetGame() {
        round = 0;
        playerScore = 0;
        computerScore = 0;
        resultText.textContent = "Choose rock, paper, or scissors.";
        scoreText.textContent = "Player Score: 0 | Computer Score: 0";
        roundText.textContent = `Round: 0 / ${maxRounds}`;
    }

    function completeSeries() {
        const finalScore = playerScore > computerScore ? 100 : playerScore === computerScore ? 50 : 0;
        const profile = window.FunHubStorage?.getPlayerProfile?.();
        window.saveGameResult?.("Rock Paper Scissors", finalScore, { playerName: profile?.name || "Player" });

        if (playerScore > computerScore) {
            resultText.textContent = "Series complete. You won the best-of-7!";
        } else if (playerScore < computerScore) {
            resultText.textContent = "Series complete. Computer won this time.";
        } else {
            resultText.textContent = "Series complete. It's a draw.";
        }
    }

    function playRound(playerChoice) {
        if (round >= maxRounds) return;

        const choices = ["rock", "paper", "scissors"];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        if (playerChoice === computerChoice) {
            resultText.textContent = `Tie! You both chose ${playerChoice}.`;
        } else if (
            (playerChoice === "rock" && computerChoice === "scissors") ||
            (playerChoice === "paper" && computerChoice === "rock") ||
            (playerChoice === "scissors" && computerChoice === "paper")
        ) {
            playerScore += 1;
            resultText.textContent = `You win this round! ${playerChoice} beats ${computerChoice}.`;
        } else {
            computerScore += 1;
            resultText.textContent = `You lose this round! ${computerChoice} beats ${playerChoice}.`;
        }

        round += 1;
        scoreText.textContent = `Player Score: ${playerScore} | Computer Score: ${computerScore}`;
        roundText.textContent = `Round: ${round} / ${maxRounds}`;

        if (round === maxRounds) {
            completeSeries();
        }
    }

    buttons.forEach((button) => {
        button.addEventListener("click", () => playRound(button.dataset.rpsChoice));
    });

    resetButton.addEventListener("click", resetGame);
    resetGame();
});