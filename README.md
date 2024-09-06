# Harry Potter Quiz Game

### Contributors

- [Lade Oshodi](https://github.com/ladeoshodi)
- [Milo Chambers](https://github.com/milochambers96)

### Attributes

Harry Potter Characters API courtesy of [HP-API](https://hp-api.herokuapp.com/)

## Overview

This project was created as part of a 48-hour hackathon undertaken in a driver-navigator format. The goal was to build a Harry Potter Quiz Game using React, with a focus on interactive gameplay and user experience. The project employs React for the frontend and uses Bulma for styling, alongside React Router for navigation.

The game features two modes: Classic Mode and Hard Mode. Classic Mode presents questions with multiple-choice answers where players identify the actor based on a list of names, while Hard Mode challenges players to select the correct actor based on images. The game includes a score system, highscore tracking, and a leaderboard.

You can access the live game [here](https://harry-potter-quiz-game.netlify.app/)

### Brief

- Consume a Public API: We used the Harry Potter API https://hp-api.herokuapp.com/api/characters to fetch character data.
- Router Integration: Implemented React Router to manage navigation between different pages.
- Semantic HTML: Ensured the use of semantically clean HTML for structural clarity.
- Deployment: Deployed the application online, making it accessible to the public.

### Features

- Landing Page: Provides an introduction to the game, and allows players to input their name, and choose between game modes.

  ![image](https://github.com/user-attachments/assets/cf2ea972-3d20-475b-a82c-ff1e9c9c91b7)

  ![image](https://github.com/user-attachments/assets/3b0f0222-258e-4995-ac1f-0899b20738e0)


- Start Game Component: Renders the game interface based on user inputs and contains the core game logic.

  ![image](https://github.com/user-attachments/assets/ce32684c-6991-4ffd-a0fb-c66a5d5d4e33)

  ![image](https://github.com/user-attachments/assets/230d1e25-e40c-49f6-baae-eb45dbcee5a3)


- End Game Component: Displays the final score, updates the highscore leaderboard, and provides options to play again or change game modes.

  ![image](https://github.com/user-attachments/assets/12a73ae2-a802-4edb-aed9-e052cec12f55)

- Leaderboard: Shows the top 5 scores for each game mode and allows players to reset scores.

  ![image](https://github.com/user-attachments/assets/973c560a-b7fc-4c34-aaca-e83609aa5d69)



- Navigation: Users can navigate between the Home page and the Leaderboard using the NavBar component with React Router.

### Development Plan

##### Classic Mode

- Gameplay: Players need to guess five random characters for each round with a 5-second time limit per character.
- Scoring: The player’s score is calculated based on the number of correct guesses out of 5.
- Leaderboard: Displays the top 5 scores stored in local storage.
- Game Reset: Players can reset the game, which will generate a new random set of five characters.

##### Hard Mode

- Gameplay: Follows many of the same principles of classic mode, but players guess the names of the actors who played the characters.
- Leaderboard: Separate leaderboard for Hard Mode.

## Key Features in Code

### Start Game Component

#### Recursive Index Generation:

- Function: generateRandomCharactersIdx
- Purpose: This function recursively generates a list of unique random indices to select characters from the API data. It ensures that a specified number of characters are chosen, each with an image, and avoids duplicating indices.
- Mechanism: The function uses recursion to keep generating random indices until the required number of unique indices is collected. It verifies each index for uniqueness and ensures that each selected character has an image.

```javascript
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
```

#### Option Generation and Shuffling:

- Functions: generateRandomOptions and shuffleOptions
- Purpose: These functions work together to create and randomise the answer choices for each quiz question.
- Mechanism:
  - generateRandomOptions: Creates a list of options for the quiz question. It includes the correct answer and several incorrect options. It randomises the selection of names from the API data based on the game mode (either the character's name or actor's name).
  - shuffleOptions: Shuffles the generated options using the Fisher-Yates algorithm. This ensures that the correct answer is not always in the same position, adding variety and challenge to the game.

```javascript
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
```

#### Dynamic Timer and Question Handling:

- Mechanism: The StartGame component utilises multiple useEffect hooks to handle time-sensitive game interactions and question progression. A setInterval function manages the countdown timer for each question, while a secondary useEffect ensures the game progresses to the next question or ends when the timer hits zero.

  - Timer Handling:

```javascript
useEffect(() => {
  intervalIDRef.current = setInterval(() => {
    setTimer((timer) => timer - 1);
  }, 1000);

  return () => {
    clearInterval(intervalIDRef.current);
  };
}, [currentCharacter]);
```

This ensures the timer decreases by 1 every second while the current character is being displayed. The timer is reset for each new question, keeping gameplay paced and engaging.

- Automatic Progression to Next Question:

```javascript
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
```

When the timer reaches zero, this hook automatically checks if all questions have been answered. If not, it proceeds to the next question by calling the setNextQuestion function.

- Next Question Setup:

```javascript
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
```

This function resets the timer and prepares the next character and answer options, ensuring smooth progression between questions.

- Purpose: Together, these mechanisms ensure a seamless gameplay experience where players are automatically moved to the next question when time runs out, maintaining game flow and keeping the pace engaging.

### End Game Component

#### High Score Management:

- Function: setHighScore
- Purpose: Updates the local storage with the current game's high scores. It ensures that the leaderboard retains the top scores based on the current game mode.
- Mechanism:

  - The function retrieves the existing high scores from local storage for the current game mode.
  - It then compares the current score with the existing high scores and updates the leaderboard accordingly.
  - If the number of high scores is less than 5, the current score is added to the list.
  - If there are already 5 high scores, the function replaces the lowest score with the current score if it is higher.

```javascript
function setHighScore() {
  const currentScore = { name: playerName, score: gameScore.score };
  let highScores = JSON.parse(localStorage.getItem(gameMode));

  if (highScores && highScores.length < 5) {
    highScores.push(currentScore);
  } else if (highScores && highScores.length >= 5) {
    const lowestScore = highScores.reduce(
      (min, score) => {
        min.score = Math.min(min.score, score.score);
        return min;
      },
      { score: Infinity }
    );

    if (currentScore.score > lowestScore.score) {
      const lowestScoreIndex = highScores.findIndex(
        (highScores) => lowestScore.score === highScores.score
      );
      highScores.splice(lowestScoreIndex, 1, currentScore);
    }
  } else {
    highScores = [currentScore];
  }

  localStorage.setItem(gameMode, JSON.stringify(highScores));
}
```

### Leaderboard Component

#### Leaderboard Score Management:

- Functions: useState, useEffect
- Purpose: Manages and renders the high scores for Classic Mode and Hard Mode by retrieving data from local storage, sorting it, and updating the state accordingly.
- Mechanism:

  - High scores are fetched for both game modes using useEffect, with scores retrieved from local storage and sorted in descending order by score.
  - The Leaderboard component handles the display of these scores, ensuring the correct scores are shown for each mode. The handleClick function allows users to reset scores, clearing local storage and updating the UI.

  ```javascript
  useEffect(() => {
    function fetchHighScores(mode) {
      const scores = JSON.parse(localStorage.getItem(mode));
      return scores ? scores.sort((a, b) => b.score - a.score) : [];
    }

    setClassicHighScores(fetchHighScores("classic"));
    setHardHighScore(fetchHighScores("hard"));
  }, []);
  ```

## Challenges and Considerations

### API Limitations and Stress Testing:

- Challenge: The Harry Potter API used for character data had limitations, including missing images for some characters. This was a critical issue as the game relies on visual elements for Hard Mode.
- Consideration: A key takeaway is the importance of stress testing external APIs to ensure they meet intended project needs.

### Time Management and Tight Timeframes:

- Challenge: The project was completed within a 48-hour hackathon timeframe, which required efficient time management and prioritisation of key features.
- Consideration: Emphasise the importance of working effectively under tight deadlines and managing scope to deliver a functional and polished final product.

### State Management Across Components:

- Challenge: Managing different states across multiple game components (StartGame, EndGame, Leaderboard) presented complexities in ensuring consistent gameplay and user experience.
- Consideration: The project showcases effective state management using React hooks (useState, useEffect, useRef) to handle game state, timers, and high scores, contributing to a seamless user experience.

### Framework Adaptation:

- Challenge: Both developers had only one week of React experience, which presented a learning curve.
- Consideration: Highlights the challenge of quickly adapting to a new framework and the importance of leveraging available resources and documentation to overcome initial hurdles.

## Potential Future Features

- Error Handling: Create an error page for incorrect routes and handle API 404 errors to improve user experience and prevent crashes or undefined states.
- Mobile Navigation: Develop an interactive hamburger menu for menu items on mobile devices (for screens smaller than 1024px), enhancing usability and responsiveness on smaller screens.
- Additional Game Modes: Expand the game by introducing new modes, such as a quiz where players match characters to their Hogwarts houses.
- Enhanced API Integration: Integrate more comprehensive APIs or additional data sources to provide richer content and enhance gameplay diversity.

