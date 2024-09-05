import "./App.css";
import { useState } from "react";
import LandingPage from "./components/LandingPage";
import StartGame from "./components/StartGame";
import NavBar from "./components/Navbar";

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
  const [gameScore, setGameScore] = useState(0);

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
      <NavBar />
      {!hasGameStarted ? (
        <LandingPage
          gameMode={gameMode}
          gameModes={gameModes}
          setGameMode={setGameMode}
          setHasGameStarted={setHasGameStarted}
          gameTitle={gameTitle}
        />
      ) : (
        <StartGame
          gameMode={gameMode}
          gameTitle={gameTitle}
          setGameScore={setGameScore}
        />
      )}
    </>
  );
}

export default App;
