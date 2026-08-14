document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("emojiInput");
  const startButton = document.getElementById("startEmojiRain");
  const stopButton = document.getElementById("stopEmojiRain");
  const container = document.getElementById("emojiRainContainer");

  let rainTimer = null;

  function createDrop(emoji) {
    const drop = document.createElement("span");
    drop.textContent = emoji;
    drop.style.position = "fixed";
    drop.style.left = `${Math.random() * 100}vw`;
    drop.style.top = "-30px";
    drop.style.fontSize = `${20 + Math.random() * 24}px`;
    drop.style.zIndex = "10";
    drop.style.pointerEvents = "none";

    container.appendChild(drop);

    let y = -30;
    const speed = 2 + Math.random() * 4;
    const fallTimer = setInterval(() => {
      y += speed;
      drop.style.top = `${y}px`;
      if (y > window.innerHeight + 50) {
        clearInterval(fallTimer);
        drop.remove();
      }
    }, 16);
  }

  startButton.addEventListener("click", () => {
    const emoji = input.value.trim() || "😀";

    if (rainTimer) {
      clearInterval(rainTimer);
    }

    rainTimer = setInterval(() => createDrop(emoji), 200);
  });

  stopButton.addEventListener("click", () => {
    if (rainTimer) {
      clearInterval(rainTimer);
      rainTimer = null;
    }
  });
});
