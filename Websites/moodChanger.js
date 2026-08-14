document.addEventListener("DOMContentLoaded", () => {
  const moodTitle = document.getElementById("moodTitle");
  const moodMessage = document.getElementById("moodMessage");
  const buttons = document.querySelectorAll("#moodButtons [data-mood]");

  const moods = {
    happy: {
      color: "#facc15",
      message: "Keep smiling. Your positive energy is contagious."
    },
    calm: {
      color: "#22d3ee",
      message: "Slow breaths. You are in control and doing great."
    },
    energetic: {
      color: "#fb7185",
      message: "Amazing momentum. Channel it into your next big move."
    },
    focused: {
      color: "#60a5fa",
      message: "Deep focus mode on. You are building something meaningful."
    }
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const mood = moods[button.dataset.mood];
      if (!mood) return;

      moodTitle.textContent = `Mood: ${button.dataset.mood}`;
      moodMessage.textContent = mood.message;
      document.body.style.transition = "background 0.4s ease";
      document.body.style.background = `radial-gradient(circle at top, ${mood.color}, #0b1120)`;
    });
  });
});
