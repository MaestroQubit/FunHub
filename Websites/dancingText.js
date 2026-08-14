document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("dancingDisplay");
  const input = document.getElementById("dancingInput");
  const button = document.getElementById("startDancingText");

  let timerId = null;

  function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  button.addEventListener("click", () => {
    const value = input.value.trim();
    display.textContent = value || "Dancing vibes activated!";

    if (timerId) {
      clearInterval(timerId);
    }

    timerId = setInterval(() => {
      const x = Math.floor(Math.random() * 16) - 8;
      const y = Math.floor(Math.random() * 16) - 8;
      const rotate = Math.floor(Math.random() * 18) - 9;
      display.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
      display.style.color = randomColor();
    }, 220);
  });
});
