import SelectInput from "./SelectInput";

function LandingPage({
  gameMode,
  gameModes,
  setGameMode,
  setHasGameStarted,
  gameTitle,
  playerName,
  setPlayerName,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    setHasGameStarted(true);
  }

  function handleChange(e) {
    setPlayerName(e.target.value);
  }

  return (
    <>
      <main className="flex-display">
        <section>
          <h1 className="title has-text-white has-text-centered">
            {gameTitle}
          </h1>
        </section>
        <form className="field" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Enter your name"
            required
            value={playerName}
            onChange={handleChange}
          ></input>
          <button className="button">Start Game</button>
        </form>

        <SelectInput
          gameMode={gameMode}
          gameModes={gameModes}
          setGameMode={setGameMode}
        />
      </main>
    </>
  );
}
export default LandingPage;
