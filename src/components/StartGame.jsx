import { useEffect, useState, useRef } from "react";

function StartGame({ gameMode, gameTitle }) {
  const initialTimerRef = useRef(5);
  const currentTimerRef = useRef(initialTimerRef.current);
  const currentQuestionNumberRef = useRef(1);
  const [characters, setCharacters] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(
    currentQuestionNumberRef.current
  );
  const [currentCharacter, setCurrentCharacter] = useState({});
  const [timer, setTimer] = useState(currentTimerRef.current);
  const generatedNumbers = [];

  async function fetchCharacters() {
    const resp = await fetch("https://hp-api.herokuapp.com/api/characters");
    const data = await resp.json();
    generateRandomCharactersIdx(data, data.length, 3);
    const selectedCharacters = generatedNumbers.map((index) => data[index]);
    setCharacters(selectedCharacters);
    setCurrentCharacter(selectedCharacters[0]);
  }

  useEffect(() => {
    fetchCharacters();
  }, []);

  function generateRandomCharactersIdx(data, dataLength, numberOfCharacters) {
    if (generatedNumbers.length === numberOfCharacters) return;
    let randomNumber = Math.floor(Math.random() * dataLength);
    if (!generatedNumbers.includes(randomNumber)) {
      if (data[randomNumber].image) {
        generatedNumbers.push(randomNumber);
      }
    }
    generateRandomCharactersIdx(data, dataLength, numberOfCharacters);
  }

  if (
    characters.length &&
    currentQuestionNumberRef.current <= characters.length &&
    currentTimerRef.current === initialTimerRef.current
  ) {
    const intervalID = setInterval(() => {
      currentTimerRef.current--;
      setTimer(currentTimerRef.current);
      if (currentTimerRef.current === 0) {
        clearInterval(intervalID);
        currentTimerRef.current = initialTimerRef.current;
        currentQuestionNumberRef.current++;

        if (currentQuestionNumberRef.current <= characters.length) {
          setCurrentCharacter(characters[currentQuestionNumberRef.current - 1]);
          setQuestionNumber(currentQuestionNumberRef.current);
          setTimer(currentTimerRef.current);
        }
      }
    }, 1000);
  }

  return (
    <>
      <section className="flex-display" style={{ paddingTop: "30px" }}>
        <h2
          className="subtitle is-3 has-text-white has-text-centered"
          style={{
            marginBottom: "8px",
          }}
        >
          Game Mode: {gameMode}
        </h2>
        <h1 className="title is-2 has-text-white has-text-centered">
          {gameTitle}
        </h1>
        <div
          className="block"
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <h2 className="subtitle is-4 has-text-white">
            Question: {questionNumber} / {characters.length}
          </h2>
          <h3
            className="tag is-medium is-danger has-text-white"
            style={{ fontWeight: "bold" }}
          >
            Timer: {timer}
          </h3>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <img
            style={{
              height: "300px",
              borderRadius: "16px",
            }}
            src={currentCharacter.image}
          ></img>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
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
