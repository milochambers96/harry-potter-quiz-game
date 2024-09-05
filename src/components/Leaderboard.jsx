import NavBar from "./Navbar";
import { useState, useEffect } from "react";

function Leaderboard() {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const classicHighScores = JSON.parse(localStorage.getItem("classic"));
    if (classicHighScores) {
      classicHighScores.sort((a, b) => {
        return b.score - a.score;
      });
      setHighScores(classicHighScores);
    }
  }, []);

  function handleClick() {
    localStorage.clear();
    setHighScores([]);
  }
  return (
    <>
      <NavBar />
      <h1 className="title has-text-white has-text-centered">High Score</h1>
      <div style={{ padding: "50px" }}>
        <h3 className="subtitle is-3 has-text-white">Classic Mode</h3>
        <ol>
          {highScores.length ? (
            highScores.map((score, index) => {
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
