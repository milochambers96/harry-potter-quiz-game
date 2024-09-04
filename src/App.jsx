import "./App.css";
import { useState } from "react";
import LandingPage from "./components/LandingPage";
import StartGame from "./components/StartGame";

function App() {
  const gameModes = [
    {
      label: "Classic",
      value: "classic",
    },
    { label: "Hard", value: "hard" },
  ];

  const [gameMode, setGameMode] = useState(gameModes[0].value);
  const [hasGameStarted, setHasGameStarted] = useState(false);

  let gameTitle = "";
  switch (gameMode) {
    case "classic":
      gameTitle = "Guess that Character!";
      break;
    case "hard":
      gameTitle = "Guess that Actor!";
      break;
  }

  return (
    <>
      {!hasGameStarted ? (
        <LandingPage
          gameMode={gameMode}
          gameModes={gameModes}
          setGameMode={setGameMode}
          setHasGameStarted={setHasGameStarted}
          gameTitle={gameTitle}
        />
      ) : (
        <StartGame gameMode={gameMode} gameTitle={gameTitle} />
      )}
    </>
  );
}

export default App;
