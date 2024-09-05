import { useEffect, useState, useRef } from "react";

function StartGame({
  gameMode,
  gameTitle,
  setGameScore,
  setHasGameBeenPlayed,
  playerName,
}) {
  const initialTimerRef = useRef(5);
  const currentTimerRef = useRef(initialTimerRef.current);
  const currentQuestionNumberRef = useRef(1);
  const responseData = useRef(null);
  const gamePoints = useRef(0);
  const [characters, setCharacters] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(
    currentQuestionNumberRef.current
  );
  const [currentCharacter, setCurrentCharacter] = useState({});
  const [timer, setTimer] = useState(currentTimerRef.current);
  const [choices, setChoices] = useState([{}]);
  const [hasMadeChoice, setHasMadeChoice] = useState(false);

  const generatedNumbers = [];

  async function fetchCharacters() {
    const resp = await fetch("https://hp-api.herokuapp.com/api/characters");
    const data = await resp.json();
    responseData.current = data;
    generateRandomCharactersIdx(data, data.length, 5);
    const selectedCharacters = generatedNumbers.map((index) => data[index]);
    const correctAnswer = data[generatedNumbers[0]].name;

    const options = generateRandomOptions(
      correctAnswer,
      responseData.current,
      3
    );
    setChoices(options);
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
  function generateRandomOptions(correctOption, data, optionLength) {
    const newOptions = [{ name: correctOption, isCorrectOption: true }];
    for (let i = optionLength; i > 0; i--) {
      newOptions.push({
        name: data[Math.floor(Math.random() * (data.length - 1)) + 1].name,
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
        setGameScore({
          score: gamePoints.current,
          totalQuestions: characters.length,
        });
        checkHasGameEnded();
        if (currentQuestionNumberRef.current <= characters.length) {
          setHasMadeChoice(false);
          setCurrentCharacter(characters[currentQuestionNumberRef.current - 1]);
          setQuestionNumber(currentQuestionNumberRef.current);
          setChoices(
            generateRandomOptions(
              characters[currentQuestionNumberRef.current - 1].name,
              responseData.current,
              3
            )
          );
          setTimer(currentTimerRef.current);
        }
      }
    }, 1000);
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

  function checkHasGameEnded() {
    if (questionNumber === characters.length) {
      setHasGameBeenPlayed(true);
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
        <h4 className="is-size-4 has-text-white has-text-centered">
          Player Name: {playerName}
        </h4>
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
