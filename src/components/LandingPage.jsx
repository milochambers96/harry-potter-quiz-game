import SelectInput from "./SelectInput";

function LandingPage({
  gameMode,
  gameModes,
  setGameMode,
  setHasGameStarted,
  gameTitle,
}) {
  function handleClick() {
    setHasGameStarted(true);
  }

  return (
    <>
      <main className="flex-display">
        <section>
          <h1 className="title has-text-white has-text-centered">
            {gameTitle}
          </h1>
        </section>
        <button className="button" onClick={handleClick}>
          Start Game
        </button>
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
