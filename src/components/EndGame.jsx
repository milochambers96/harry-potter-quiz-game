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
        <h1 className="title has-text-white has-text-centered">
          Your Score: {gameScore.score}/{gameScore.totalQuestions}
        </h1>
        <img
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXoxam45c3d6aHJwdHgwa2FjcWZoOGJ4MDN[…]D12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gbErpwcLlizvi/200.webp"
          alt="Harry Potter celebrates giphy"
        />
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
