import { useState } from "react";
import "./App.css";

const gameModes = [
  {
    label: "Classic",
    value: "classic",
  },
  { label: "Hard", value: "hard" },
];

function App() {
  const [gameMode, setGameMode] = useState(gameModes[0].value);

  let title = "";
  switch (gameMode) {
    case "classic":
      title = "Guess that Character!";
      break;
    case "hard":
      title = "Guess that Actor!";
      break;
  }

  function handleChange(e) {
    setGameMode(e.target.value);
  }

  return (
    <>
      <nav>LeaderBoard</nav>
      <section>
        <h1>{title}</h1>
      </section>
      <button>Start Game</button>
      <section>
        <label htmlFor="game-mode">Game mode: </label>
        <select
          onChange={handleChange}
          name="game-mode"
          id="game-mode"
          value={gameMode}
        >
          {gameModes.map((gameMode, index) => {
            return (
              <option key={index} value={gameMode.value}>
                {gameMode.label}
              </option>
            );
          })}
        </select>
      </section>
    </>
  );
}

export default App;
