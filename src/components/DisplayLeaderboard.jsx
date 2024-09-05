function DisplayLeaderboard({ title, highScores }) {
  return (
    <div style={{ padding: "20px 50px" }}>
      <h4 className="subtitle is-4 has-text-white">{title}</h4>
      <ol>
        {highScores.length ? (
          highScores.map((score, index) => (
            <li key={index} className="is-size-5 has-text-white">
              {score.name} - {score.score}
            </li>
          ))
        ) : (
          <p className="is-size-5 has-text-white">No current high scores</p>
        )}
      </ol>
    </div>
  );
}

export default DisplayLeaderboard;
