import NavBar from "./Navbar";
import { useState, useEffect } from "react";

function Leaderboard() {
  const [classicHighScores, setClassicHighScores] = useState([]);
  const [hardHighScore, setHardHighScore] = useState([]);

  useEffect(() => {
    const classicHighScores = JSON.parse(localStorage.getItem("classic"));
    if (classicHighScores) {
      classicHighScores.sort((a, b) => {
        return b.score - a.score;
      });
      setClassicHighScores(classicHighScores);
    }
  }, []);

  useEffect(() => {
    const hardHighScore = JSON.parse(localStorage.getItem("hard"));
    if (hardHighScore) {
      hardHighScore.sort((a, b) => {
        return b.score - a.score;
      });
      setHardHighScore(hardHighScore);
    }
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
      <div style={{ padding: "50px" }}>
        <h3 className="subtitle is-3 has-text-white">Classic Mode</h3>
        <ol>
          {classicHighScores.length ? (
            classicHighScores.map((score, index) => {
              return (
                <li key={index} className="is-size-5 has-text-white">
                  {score.name} - {score.score}
                </li>
              );
            })
          ) : (
            <p className=" is-size-5 has-text-white">No current high scores</p>
          )}
        </ol>
      </div>
      <div style={{ padding: "50px" }}>
        <h3 className="subtitle is-3 has-text-white">Hard Mode</h3>
        <ol>
          {hardHighScore.length ? (
            hardHighScore.map((score, index) => {
              return (
                <li key={index} className="is-size-5 has-text-white">
                  {score.name} - {score.score}
                </li>
              );
            })
          ) : (
            <p className=" is-size-5 has-text-white">No current high scores</p>
          )}
        </ol>
      </div>
      <button className="button has-background-danger" onClick={handleClick}>
        Reset high scores!
      </button>
    </>
  );
}

export default Leaderboard;
