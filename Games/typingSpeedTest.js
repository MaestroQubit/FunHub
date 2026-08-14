document.addEventListener("DOMContentLoaded", () => {
	const promptText = document.getElementById("typingPrompt");
	const input = document.getElementById("typingInput");
	const startButton = document.getElementById("startTypingTest");
	const resultText = document.getElementById("typingResult");
	const timerText = document.getElementById("typingTimer");
	const wpmText = document.getElementById("typingWpm");

	const prompts = [
		"Code is like humor. When you have to explain it, it is bad.",
		"Small steps every day lead to big results.",
		"Practice does not make perfect, practice makes progress.",
		"Focus on consistency, speed will follow.",
		"Debugging is simply detective work in a digital world."
	];

	let currentPrompt = "";
	let startTime = null;
	let timerId = null;

	function pickPrompt() {
		currentPrompt = prompts[Math.floor(Math.random() * prompts.length)];
		promptText.textContent = currentPrompt;
	}

	function resetDisplay() {
		input.value = "";
		input.disabled = false;
		resultText.textContent = "Type the sentence exactly and click Finish.";
		timerText.textContent = "Time: 0.0s";
		wpmText.textContent = "WPM: 0";
	}

	function startTest() {
		if (timerId) {
			clearInterval(timerId);
			timerId = null;
		}

		pickPrompt();
		resetDisplay();
		input.focus();
		startTime = performance.now();

		timerId = setInterval(() => {
			const seconds = (performance.now() - startTime) / 1000;
			timerText.textContent = `Time: ${seconds.toFixed(1)}s`;
		}, 100);
	}

	function finishTest() {
		if (!startTime) {
			resultText.textContent = "Press Start Test first.";
			return;
		}

		const elapsedSeconds = Math.max(1, (performance.now() - startTime) / 1000);
		const typed = input.value.trim();
		const target = currentPrompt.trim();

		clearInterval(timerId);
		timerId = null;

		if (typed !== target) {
			resultText.textContent = "Text does not match exactly. Try again for accurate score.";
			wpmText.textContent = "WPM: 0";
			return;
		}

		const words = typed.split(/\s+/).filter(Boolean).length;
		const wpm = Math.round((words / elapsedSeconds) * 60);
		wpmText.textContent = `WPM: ${wpm}`;
		resultText.textContent = "Excellent! Sentence typed correctly.";

		const profile = window.FunHubStorage?.getPlayerProfile?.();
		window.saveGameResult?.("Typing Speed Test", wpm, { playerName: profile?.name || "Player" });
		input.disabled = true;
	}

	startButton.addEventListener("click", () => {
		if (startButton.dataset.mode !== "running") {
			startButton.dataset.mode = "running";
			startButton.textContent = "Finish Test";
			startTest();
			return;
		}

		startButton.dataset.mode = "idle";
		startButton.textContent = "Start Test";
		finishTest();
	});

	pickPrompt();
	resetDisplay();
});
