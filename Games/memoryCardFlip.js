document.addEventListener("DOMContentLoaded", () => {
	const board = document.getElementById("memoryBoard");
	const status = document.getElementById("memoryStatus");
	const movesText = document.getElementById("memoryMoves");
	const resetButton = document.getElementById("resetMemoryGame");

	const symbols = ["A", "B", "C", "D", "E", "F"];
	let deck = [];
	let firstCard = null;
	let lockBoard = false;
	let moves = 0;
	let matchedPairs = 0;

	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i -= 1) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	function updateMoves() {
		movesText.textContent = `Moves: ${moves}`;
	}

	function finishGame() {
		const score = Math.max(10, 200 - moves * 10);
		status.textContent = "Great memory! You matched all cards.";
		const profile = window.FunHubStorage?.getPlayerProfile?.();
		window.saveGameResult?.("Memory Card Flip", score, { playerName: profile?.name || "Player" });
	}

	function resetGame() {
		board.innerHTML = "";
		deck = shuffle([...symbols, ...symbols]);
		firstCard = null;
		lockBoard = false;
		moves = 0;
		matchedPairs = 0;
		status.textContent = "Find all matching pairs.";
		updateMoves();

		deck.forEach((symbol, index) => {
			const button = document.createElement("button");
			button.type = "button";
			button.className = "memory-card";
			button.dataset.symbol = symbol;
			button.dataset.index = String(index);
			button.textContent = "?";
			board.appendChild(button);
		});
	}

	function reveal(card) {
		card.textContent = card.dataset.symbol;
		card.disabled = true;
		card.classList.add("revealed");
	}

	function hide(card) {
		card.textContent = "?";
		card.disabled = false;
		card.classList.remove("revealed");
	}

	board.addEventListener("click", (event) => {
		const card = event.target.closest(".memory-card");
		if (!card || lockBoard || card.classList.contains("matched")) return;

		reveal(card);

		if (!firstCard) {
			firstCard = card;
			return;
		}

		moves += 1;
		updateMoves();

		const isMatch = firstCard.dataset.symbol === card.dataset.symbol && firstCard.dataset.index !== card.dataset.index;

		if (isMatch) {
			firstCard.classList.add("matched");
			card.classList.add("matched");
			matchedPairs += 1;
			firstCard = null;

			if (matchedPairs === symbols.length) {
				finishGame();
			}
			return;
		}

		lockBoard = true;
		const prevFirst = firstCard;
		firstCard = null;
		setTimeout(() => {
			hide(prevFirst);
			hide(card);
			lockBoard = false;
		}, 700);
	});

	resetButton.addEventListener("click", resetGame);
	resetGame();
});
