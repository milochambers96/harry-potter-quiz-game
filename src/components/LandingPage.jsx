import { useState } from "react";
// import StartGame from "./components/StartGame";
import { Link } from "react-router-dom";

function LandingPage() {
  const gameModes = [
    {
      label: "Classic",
      value: "classic",
    },
    { label: "Hard", value: "hard" },
  ];

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
      <nav className="navbar has-background-info">
        <div className="navbar-menu is-active" id="navbarItems">
          <a className="navbar-item">Leaderboard</a>
        </div>
      </nav>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          height: "50vh",
        }}
      >
        <section>
          <h1 className="title has-text-white">{title}</h1>
        </section>
        <Link className="button" to="/start-game">
          Start Game
        </Link>
        <section>
          <div className="select">
            <select
              onChange={handleChange}
              name="game-mode"
              id="game-mode"
              value={gameMode}
            >
              <option disabled>Game Mode:</option>
              {gameModes.map((gameMode, index) => {
                return (
                  <option key={index} value={gameMode.value}>
                    {gameMode.label}
                  </option>
                );
              })}
            </select>
          </div>
        </section>
      </main>
    </>
  );
}
export default LandingPage;
