document.addEventListener("DOMContentLoaded", () => {
  const fortunes = [
    "A surprising opportunity is closer than you think.",
    "Your patience will unlock a big win soon.",
    "A new connection will bring fresh inspiration.",
    "Today is great for starting something brave.",
    "A tiny step now will lead to huge progress later.",
    "Trust your intuition, it is sharper than usual today."
  ];

  const questionInput = document.getElementById("fortuneQuestion");
  const button = document.getElementById("tellFortune");
  const result = document.getElementById("fortuneResult");

  button.addEventListener("click", () => {
    const question = questionInput.value.trim();
    if (!question) {
      result.textContent = "Ask a question first.";
      return;
    }

    const index = Math.floor(Math.random() * fortunes.length);
    result.textContent = fortunes[index];
  });
});
