import { Link } from "react-router-dom";
import SelectInput from "./SelectInput";

function EndGame({
  gameScore,
  gameMode,
  gameModes,
  setGameMode,
  setHasGameBeenPlayed,
}) {
  console.log(gameScore);

  function handleClick() {
    setHasGameBeenPlayed(false);
  }

  return (
    <>
      <section className="flex-display" style={{ paddingTop: "30px" }}>
        <h1>Your Score: {gameScore}/10</h1>
        <img src="Giphy URL" alt="Giphy" />
        <button className="button" onClick={handleClick}>
          Play Again
        </button>
        <div className="select">
          <SelectInput
            gameMode={gameMode}
            gameModes={gameModes}
            setGameMode={setGameMode}
          />
        </div>
      </section>
    </>
  );
}

export default EndGame;
