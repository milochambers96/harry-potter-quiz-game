import { Link } from "react-router-dom";

function LandingPage({ gameMode, gameModes, setGameMode, setHasGameStarted }) {
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

  function handleClick() {
    setHasGameStarted(true);
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
        <button className="button" onClick={handleClick}>
          Start Game
        </button>
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
