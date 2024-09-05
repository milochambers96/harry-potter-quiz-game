import NavBar from "./Navbar";
import { useState, useEffect } from "react";

function Leaderboard() {
  const [classicHighScores, setClassicHighScores] = useState([]);

  useEffect(() => {
    const classicHighScores = JSON.parse(localStorage.getItem("classic"));
    if (classicHighScores) {
      classicHighScores.sort((a, b) => {
        return b.score - a.score;
      });
      setClassicHighScores(classicHighScores);
    }
  }, []);
  return (
    <>
      <NavBar />
      <h1 className="title has-text-white has-text-centered">High Score</h1>
      <div style={{ padding: "50px" }}>
        <h3 className="subtitle is-3 has-text-white">Classic Mode</h3>
        <ol>
          {classicHighScores.map((score, index) => {
            return (
              <li key={index} className="is-size-5 has-text-white">
                {score.name} - {score.score}
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}

export default Leaderboard;
