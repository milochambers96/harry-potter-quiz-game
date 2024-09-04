import { useEffect, useState } from "react";

function StartGame({ gameMode, gameTitle }) {
  const [characters, setCharacters] = useState([]);
  //   const [currentIndex, setCurrentIndex] = useState(0);

  const generatedNumbers = [];

  async function fetchCharacters() {
    const resp = await fetch("https://hp-api.herokuapp.com/api/characters");
    const data = await resp.json();
    generateRandomCharactersIdx(data, data.length, 10);
    const selectedCharacters = generatedNumbers.map((index) => data[index]);
    setCharacters(selectedCharacters);
    // const charactersData = structuredClone(characters);
    // setCharacters(charactersData);
    // console.log(charactersData);
    console.log(generatedNumbers);
  }

  useEffect(() => {
    fetchCharacters();
  }, []);

  console.log(characters);

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

  //   const currentCharacter = characters[currentIndex];

  return (
    <>
      <section>
        <h1>{gameTitle}</h1>
        <h2>Question</h2>
        <h3>Timer</h3>
        <div className="image-container">
          {/* <img src={currentCharacter.image}></img> */}
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
