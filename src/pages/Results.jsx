import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../api";

function Results() {
  const [poll, setPoll] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const url = API_URL + `/api/polls/${id}`;
    async function getResults() {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to Load the results.");
        const data = await response.json();
        setPoll(data);
      } catch (error) {
        setError(error.message);
      }
    }
    getResults();
  }, [id]);

  if (error) return <div className="message error-message">{error}</div>;
  if (!poll) return <div className="message">Loading results…</div>;

  const totalVotes = poll.Options.reduce(
    (total, option) => total + option.Votes.length,
    0,
  );

  return (
    <section className="page narrow-page">
      <header className="page-header left-aligned">
        <span className="eyebrow">{totalVotes} total votes</span>
        <h1>{poll.title}</h1>
        <p>{poll.description}</p>
      </header>
      {poll.Options.length === 0 && (
        <div className="empty-state">
          <h2>No results yet</h2>
          <p>This poll does not have any answer choices.</p>
        </div>
      )}
      <div className="results-list">
        {poll.Options.map((option) => {
          const votes = option.Votes.length;
          const percentage = totalVotes ? Math.round((votes / totalVotes) * 100) : 0;
          return (
            <article className="result-row" key={option.id}>
              <div className="result-label">
                <strong>{option.text}</strong>
                <span>{votes} {votes === 1 ? "vote" : "votes"} · {percentage}%</span>
              </div>
              <div className="result-track">
                <div className="result-fill" style={{ width: `${percentage}%` }} />
              </div>
            </article>
          );
        })}
      </div>
      <button className="button primary-button" onClick={() => window.history.back()}>
        Back to poll
      </button>
    </section>
  );
}

export default Results;
