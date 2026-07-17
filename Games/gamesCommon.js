function saveGameResult(gameName, score) {
  const newRecord = {
    game: gameName,
    date: new Date().toLocaleString(),
    score: score
  };

  let history = JSON.parse(localStorage.getItem("gameHistory")) || [];
  history.push(newRecord);
  localStorage.setItem("gameHistory", JSON.stringify(history));
}
  