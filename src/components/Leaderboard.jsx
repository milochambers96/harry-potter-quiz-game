import NavBar from "./Navbar";
import DisplayLeaderboard from "./DisplayLeaderboard";
import { useState, useEffect } from "react";

function Leaderboard() {
  const [classicHighScores, setClassicHighScores] = useState([]);
  const [hardHighScore, setHardHighScore] = useState([]);

  useEffect(() => {
    function fetchHighScores(mode) {
      const scores = JSON.parse(localStorage.getItem(mode));
      return scores ? scores.sort((a, b) => b.score - a.score) : [];
    }

    setClassicHighScores(fetchHighScores("classic"));
    setHardHighScore(fetchHighScores("hard"));
  }, []);

  function handleClick() {
    localStorage.clear();
    setClassicHighScores([]);
    setHardHighScore([]);
  }
  return (
    <>
      <NavBar />
      <h1 className="title has-text-white has-text-centered">High Score</h1>
      <DisplayLeaderboard title="Classic Mode" highScores={classicHighScores} />
      <DisplayLeaderboard title="Hard Mode" highScores={hardHighScore} />
      <button className="button has-background-danger" onClick={handleClick}>
        Reset high scores!
      </button>
    </>
  );
}

export default Leaderboard;
