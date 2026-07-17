let round = 0;
let playerScore = 0;
let computerScore = 0;

function playRPS(playerChoice) {
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    let result = "";

    if (playerChoice === computerChoice) {
        result = `It's a tie! You both chose ${playerChoice}.`;
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        result = `You win! ${playerChoice} beats ${computerChoice}.`;
        playerScore++;
        round++;
    } else {
        result = `You lose! ${computerChoice} beats ${playerChoice}.`;
        computerScore++;
        round++;
    }

    document.getElementById("rpsResult").textContent = result;
    document.getElementById("rpsScore").textContent = `Player Score: ${playerScore} | Computer Score: ${computerScore}`;
    document.getElementById("roundCount").textContent = `Round: ${round} / 7`;

    if (round === 7) {
        saveGameResult("Rock, Paper and Scissors", playerScore);

        alert(`Round finished! Final Scores → Player: ${playerScore}, Computer: ${computerScore}`);

        playerScore = 0;
        computerScore = 0;
        round = 0;

        document.getElementById("rpsScore").textContent = `Player Score: ${playerScore} | Computer Score: ${computerScore}`;
        document.getElementById("roundCount").textContent = `Round: ${round} / 7`;
    }
}