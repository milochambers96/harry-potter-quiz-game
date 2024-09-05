# Harry Potter Quiz Game

## Getting Starting

1. Clone this repo
2. Run `npm i`
3. Run `npm run dev`
4. Start contributing

### Contributors

- [Lade Oshodi](https://github.com/ladeoshodi)
- [Milo Chambers](https://github.com/milochambers96)

### Attributes

Harry Potter Characters API courtesy of [HP-API](https://hp-api.herokuapp.com/)

## Overview

This project was created as part of a 48-hour hackathon undertaken in a driver-navigator format. The goal was to build a Harry Potter Quiz Game using React, with a focus on interactive gameplay and user experience. The project employs React for the frontend and uses Bulma for styling, alongside React Router for navigation.

The game features two modes: Classic Mode and Hard Mode. Classic Mode presents questions with multiple-choice answers where players identify the actor based on a list of names, while Hard Mode challenges players to select the correct actor based on images. The game includes a score system, highscore tracking, and a leaderboard.

You can access the live game [here] ---> need to add link

### Brief

- Consume a Public API: We used the Harry Potter API https://hp-api.herokuapp.com/api/characters to fetch character data.
- Router Integration: Implemented React Router to manage navigation between different pages.
- Semantic HTML: Ensured the use of semantically clean HTML for structural clarity.
- Deployment: Deployed the application online, making it accessible to the public.

### Features

- Landing Page: Provides an introduction to the game, allows players to input their name, and choose between game modes.
- Start Game Component: Renders the game interface based on user inputs and contains the core game logic.
- End Game Component: Displays the final score, updates the highscore leaderboard, and provides options to play again or change game modes.
- Leaderboard: Shows the top 5 scores for each game mode and allows players to reset scores.
- Navigation: Users can navigate between the Home page and the Leaderboard using the NavBar component with React Router.

###### Maybe inclucde screenshots of the game pages

### Development Plan

##### Classic Mode

- Gameplay: Players need to guess five random characters for each round with a 5-second time limit per character.
- Scoring: The player’s score is calculated based on the number of correct guesses out of 5.
- Leaderboard: Displays the top 5 scores stored in local storage.
- Game Reset: Players can reset the game, which will generate a new random set of five characters.

##### Hard Mode

- Gameplay: Follows many of the same principles of classic mode, but players guess the names of the actors who played the characters.
- Leaderboard: Separate leaderboard for Hard Mode.

### Key Features in Code

### Start Game Component

#### Recursive Index Generation:

- Function: generateRandomCharactersIdx
- Purpose: This function recursively generates a list of unique random indices to select characters from the API data. It ensures that a specified number of characters are chosen, each with an image, and avoids duplicating indices.
- Mechanism: The function uses recursion to keep generating random indices until the required number of unique indices is collected. It verifies each index for uniqueness and ensures that each selected character has an image.

## add code snapshot

#### Option Generation and Shuffling:

- Functions: generateRandomOptions and shuffleOptions
- Purpose: These functions work together to create and randomise the answer choices for each quiz question.
- Mechanism:
- - generateRandomOptions: Creates a list of options for the quiz question. It includes the correct answer and several incorrect options. It randomises the selection of names from the API data based on the game mode (either the character's name or actor's name).
- - shuffleOptions: Shuffles the generated options using the Fisher-Yates algorithm. This ensures that the correct answer is not always in the same position, adding variety and challenge to the game.

## add code snapshot

#### Dynamic Timer and Question Handling:

- Mechanism:useRef and setInterval: The component uses useRef to manage mutable values for the timer and question number. The setInterval function updates the timer every second, automatically progressing to the next question when the timer reaches zero.
- Purpose: This mechanism ensures smooth and consistent game progression, allowing the game to handle time-sensitive interactions effectively and keep the gameplay engaging.

### End Game Component

#### High Score Management:

- Function: setHighScore
- Purpose: Updates the local storage with the current game's high scores. It ensures that the leaderboard retains the top scores based on the current game mode.
- Mechanism:
- - The function retrieves the existing high scores from local storage for the current game mode.
- - It then compares the current score with the existing high scores and updates the leaderboard accordingly.
- - If the number of high scores is less than 5, the current score is added to the list.
- - If there are already 5 high scores, the function replaces the lowest score with the current score if it is higher.

#### High Score Retrieval and Sorting:

- Functions: useEffect Hooks to render scores
- Purpose: Retrieves and sorts high scores for both game modes from local storage when the component mounts.
- Mechanism:
- - Classic Mode: Retrieves scores, sorts them in descending order, and updates the state.
- - Hard Mode: Similarly, retrieves and sorts scores, ensuring the leaderboard displays the top scores correctly.

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
- Consideration: Highlights the challenge of adapting to a new framework quickly and the importance of leveraging available resources and documentation to overcome initial hurdles.

## Potential Future Features 

- Additional Game Modes: Expand the game by introducing new modes, such as a quiz where players match characters to their Hogwarts houses or test their knowledge on magical creatures.
- Enhanced API Integration: Integrate more comprehensive APIs or additional data sources to provide richer content and enhance gameplay diversity.
