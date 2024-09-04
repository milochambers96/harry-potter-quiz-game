function StartGame({ gameMode, gameTitle }) {
  return (
    <>
      <section>
        <h1>{gameTitle}</h1>
        <h2>Question</h2>
        <h3>Timer</h3>
        <div className="image-container">
          <img></img>
        </div>
        <div className="choices-container">
          <button className="button">1</button>
          <button className="button">2</button>
          <button className="button">3</button>
          <button className="button">4</button>
        </div>
      </section>
    </>
  );
}

export default StartGame;
