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

  return (
    <>
      {!hasGameStarted ? (
        <LandingPage
          gameMode={gameMode}
          gameModes={gameModes}
          setGameMode={setGameMode}
          setHasGameStarted={setHasGameStarted}
        />
      ) : (
        <StartGame gameMode={gameMode} />
      )}
    </>
  );
}

export default App;
