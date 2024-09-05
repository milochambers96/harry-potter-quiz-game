function SelectInput({ gameMode, gameModes, setGameMode }) {
  function handleChange(e) {
    setGameMode(e.target.value);
  }

  return (
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
  );
}

export default SelectInput;
