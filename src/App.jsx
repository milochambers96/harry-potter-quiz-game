import "./App.css";
import { useState } from "react";
import LandingPage from "./components/LandingPage";
import StartGame from "./components/StartGame";
import EndGame from "./components/EndGame";
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
  const [hasGameBeenPlayed, setHasGameBeenPlayed] = useState(true);
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

  function gamePageToRender() {
    if (hasGameBeenPlayed) {
      return (
        <EndGame
          gameScore={gameScore}
          gameMode={gameMode}
          gameModes={gameModes}
          setGameMode={setGameMode}
          setHasGameStarted={setHasGameStarted}
          setHasGameBeenPlayed={setHasGameBeenPlayed}
        />
      );
    } else if (!hasGameStarted) {
      return (
        <LandingPage
          gameMode={gameMode}
          gameModes={gameModes}
          setGameMode={setGameMode}
          setHasGameStarted={setHasGameStarted}
          gameTitle={gameTitle}
        />
      );
    } else if (hasGameStarted) {
      return (
        <StartGame
          gameMode={gameMode}
          gameTitle={gameTitle}
          setGameScore={setGameScore}
          setHasGameBeenPlayed={setHasGameBeenPlayed}
        />
      );
    }
  }

  return (
    <>
      <NavBar />
      {gamePageToRender()}
    </>
  );
}

export default App;
