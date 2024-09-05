import { useEffect, useState } from "react";

const intialTimer = 5;
let currentTimer = intialTimer;
let currentQuestionNumber = 1;

function StartGame({ gameMode, gameTitle }) {
  const [characters, setCharacters] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(currentQuestionNumber);
  const [currentCharacter, setCurrentCharacter] = useState({});
  const [timer, setTimer] = useState(currentTimer);
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
    currentQuestionNumber <= characters.length &&
    currentTimer === intialTimer
  ) {
    const intervalID = setInterval(() => {
      currentTimer--;
      setTimer(currentTimer);
      if (currentTimer === 0) {
        clearInterval(intervalID);
        currentTimer = intialTimer;
        currentQuestionNumber++;

        if (currentQuestionNumber <= characters.length) {
          setCurrentCharacter(characters[currentQuestionNumber - 1]);
          setQuestionNumber(currentQuestionNumber);
          setTimer(currentTimer);
        }
      }
    }, 1000);
  }

  return (
    <>
      <section className="flex-display" style={{ paddingTop: "30px" }}>
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
