document.addEventListener("DOMContentLoaded", () => {
	const questionText = document.getElementById("quizQuestion");
	const optionsWrap = document.getElementById("quizOptions");
	const resultText = document.getElementById("quizResult");
	const scoreText = document.getElementById("quizScore");
	const nextButton = document.getElementById("nextQuizQuestion");
	const restartButton = document.getElementById("restartQuiz");

	const questions = [
		{
			question: "Which language runs in the browser?",
			options: ["Java", "C", "Python", "JavaScript"],
			answer: 3
		},
		{
			question: "What does CSS stand for?",
			options: ["Cascading Style Sheets", "Computer Style Syntax", "Creative Styling System", "Code Styling Sheets"],
			answer: 0
		},
		{
			question: "Which tag is used for a hyperlink?",
			options: ["<a>", "<link>", "<href>", "<url>"],
			answer: 0
		},
		{
			question: "Which method converts JSON text into an object?",
			options: ["JSON.stringify", "JSON.parse", "JSON.object", "JSON.convert"],
			answer: 1
		},
		{
			question: "Which company developed JavaScript?",
			options: ["Microsoft", "Netscape", "Google", "Oracle"],
			answer: 1
		}
	];

	let currentIndex = 0;
	let score = 0;
	let selectedOption = null;

	function renderQuestion() {
		const current = questions[currentIndex];
		selectedOption = null;
		questionText.textContent = `Q${currentIndex + 1}. ${current.question}`;
		optionsWrap.innerHTML = "";
		resultText.textContent = "";

		current.options.forEach((option, index) => {
			const button = document.createElement("button");
			button.type = "button";
			button.className = "quiz-option";
			button.textContent = option;
			button.addEventListener("click", () => {
				selectedOption = index;
				optionsWrap.querySelectorAll("button").forEach((btn) => btn.classList.remove("selected"));
				button.classList.add("selected");
			});
			optionsWrap.appendChild(button);
		});

		nextButton.textContent = currentIndex === questions.length - 1 ? "Finish Quiz" : "Next Question";
		scoreText.textContent = `Score: ${score}`;
	}

	function handleNext() {
		if (selectedOption === null) {
			resultText.textContent = "Please choose an option before continuing.";
			return;
		}

		const current = questions[currentIndex];
		if (selectedOption === current.answer) {
			score += 10;
			resultText.textContent = "Correct!";
		} else {
			resultText.textContent = `Wrong. Correct answer: ${current.options[current.answer]}`;
		}

		scoreText.textContent = `Score: ${score}`;

		if (currentIndex === questions.length - 1) {
			const profile = window.FunHubStorage?.getPlayerProfile?.();
			window.saveGameResult?.("Quiz Game", score, { playerName: profile?.name || "Player" });
			questionText.textContent = "Quiz completed.";
			optionsWrap.innerHTML = "";
			nextButton.disabled = true;
			return;
		}

		currentIndex += 1;
		setTimeout(renderQuestion, 400);
	}

	function restartQuiz() {
		currentIndex = 0;
		score = 0;
		nextButton.disabled = false;
		renderQuestion();
	}

	nextButton.addEventListener("click", handleNext);
	restartButton.addEventListener("click", restartQuiz);
	renderQuestion();
});
