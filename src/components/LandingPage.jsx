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
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
          onSubmit={handleSubmit}
        >
          <div className="control">
            <input
              className="input is-medium"
              type="text"
              placeholder="Enter your name"
              required
              value={playerName}
              onChange={handleChange}
            ></input>
          </div>
          <div className="control">
            <button className="button">Start Game</button>
          </div>
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
