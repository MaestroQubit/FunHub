(() => {
  const STORAGE_KEYS = {
    playerName: "playerName",
    playerRollNo: "playerRollNo",
    playerAge: "playerAge",
    gameHistory: "gameHistory"
  };

  function safeReadJSON(key, fallbackValue) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallbackValue;
    } catch {
      return fallbackValue;
    }
  }

  function getGameHistory() {
    const history = safeReadJSON(STORAGE_KEYS.gameHistory, []);
    return Array.isArray(history) ? history : [];
  }

  function saveGameResult(gameName, score, extra = {}) {
    const numericScore = Number(score);
    const normalizedScore = Number.isFinite(numericScore) ? numericScore : String(score);

    const newRecord = {
      game: String(gameName || "Unknown Game"),
      date: new Date().toLocaleString(),
      score: normalizedScore,
      ...extra
    };

    const history = getGameHistory();
    history.push(newRecord);
    localStorage.setItem(STORAGE_KEYS.gameHistory, JSON.stringify(history));
    return newRecord;
  }

  function getPlayerProfile() {
    return {
      name: localStorage.getItem(STORAGE_KEYS.playerName) || "",
      rollNo: localStorage.getItem(STORAGE_KEYS.playerRollNo) || "",
      age: localStorage.getItem(STORAGE_KEYS.playerAge) || ""
    };
  }

  function setPlayerProfile({ name = "", rollNo = "", age = "" }) {
    localStorage.setItem(STORAGE_KEYS.playerName, String(name).trim());
    localStorage.setItem(STORAGE_KEYS.playerRollNo, String(rollNo).trim());
    localStorage.setItem(STORAGE_KEYS.playerAge, String(age).trim());
  }

  window.FunHubStorage = {
    STORAGE_KEYS,
    getGameHistory,
    saveGameResult,
    getPlayerProfile,
    setPlayerProfile
  };

  window.saveGameResult = saveGameResult;
})();
  