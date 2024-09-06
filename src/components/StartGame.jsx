import { useEffect, useState, useRef } from "react";

function StartGame({
  gameMode,
  gameTitle,
  setGameScore,
  setHasGameBeenPlayed,
  playerName,
}) {
  const responseData = useRef(null);
  const gamePoints = useRef(0);
  const intervalIDRef = useRef(null);

  const initialTimer = 5;
  const [characters, setCharacters] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [currentCharacter, setCurrentCharacter] = useState({});
  const [timer, setTimer] = useState(initialTimer);
  const [choices, setChoices] = useState([{}]);
  const [hasMadeChoice, setHasMadeChoice] = useState(false);

  const generatedNumbers = [];

  useEffect(() => {
    async function fetchCharacters() {
      const resp = await fetch("https://hp-api.herokuapp.com/api/characters");
      const data = await resp.json();
      responseData.current = data;
      loadGame();
    }
    fetchCharacters();
  }, []);

  function loadGame() {
    generateRandomCharactersIdx(
      responseData.current,
      responseData.current.length,
      5
    );
    const selectedCharacters = generatedNumbers.map(
      (index) => responseData.current[index]
    );
    const correctAnswer =
      gameMode === "hard" && responseData.current[generatedNumbers[0]].actor
        ? responseData.current[generatedNumbers[0]].actor
        : responseData.current[generatedNumbers[0]].name;

    const options = generateRandomOptions(
      correctAnswer,
      responseData.current,
      3
    );
    setChoices(options);
    setCharacters(selectedCharacters);
    setCurrentCharacter(selectedCharacters[0]);
  }

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

  function generateRandomOptions(correctOption, data, optionLength) {
    const newOptions = [{ name: correctOption, isCorrectOption: true }];
    for (let i = optionLength; i > 0; i--) {
      const randNum = Math.floor(Math.random() * (data.length - 1)) + 1;
      const gameName =
        gameMode === "hard" && data[randNum].actor
          ? data[randNum].actor
          : data[randNum].name;
      newOptions.push({
        name: gameName,
        isCorrectOption: false,
      });
    }
    return shuffleOptions(newOptions);
  }

  function shuffleOptions(options) {
    for (let i = options.length - 1; i > 0; i--) {
      const rI = Math.floor(Math.random() * (i + 1));
      [options[i], options[rI]] = [options[rI], options[i]];
    }
    return options;
  }

  useEffect(() => {
    intervalIDRef.current = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);

    return () => {
      clearInterval(intervalIDRef.current);
    };
  }, [currentCharacter]);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(intervalIDRef.current);
      if (questionNumber === characters.length) {
        setGameScore({
          score: gamePoints.current,
          totalQuestions: characters.length,
        });
        setHasGameBeenPlayed(true);
      } else {
        setNextQuestion();
      }
    }
  }, [timer]);

  function setNextQuestion() {
    setTimer(initialTimer);
    setQuestionNumber((questionNumber) => questionNumber + 1);
    setCurrentCharacter(characters[questionNumber]);
    setHasMadeChoice(false);
    const correctCharacterName =
      gameMode === "hard" && characters[questionNumber].actor
        ? characters[questionNumber].actor
        : characters[questionNumber].name;
    setChoices(
      generateRandomOptions(correctCharacterName, responseData.current, 3)
    );
  }

  function handleClick(e) {
    setHasMadeChoice(true);
    const isRightChoice = choices.find((choice) => {
      return choice.name === e.target.dataset.name;
    });
    if (isRightChoice.isCorrectOption) {
      gamePoints.current++;
    }
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
        <div className="block">
          <h4 className="is-size-4 has-text-white has-text-centered">
            Player Name: {playerName}
          </h4>
        </div>
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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          {choices.map((choice, i) => {
            return (
              <button
                key={i}
                className="button"
                onClick={handleClick}
                data-name={choice.name}
                disabled={hasMadeChoice}
              >
                {choice.name}
              </button>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default StartGame;
