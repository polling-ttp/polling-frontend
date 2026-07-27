import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import "./ResultsPage.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function ResultsPage() {
  const { id } = useParams();
  const pollId = id ? Number(id) : null;
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pollId || Number.isNaN(pollId)) {
      setLoading(false);
      setError("Missing or invalid poll ID.");
      return;
    }

    const url = `${API_URL}/polls/${pollId}/votes`;

    async function getResults() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) {
          const body = await response.text().catch(() => "");
          throw new Error(
            `Request failed (${response.status}): ${body || response.statusText}`,
          );
        }
        const data = await response.json(); // array of { voteId, optionId, optionLabel }

        // Group votes by option and count them
        const counts = {};
        data.forEach((v) => {
          const key = v.optionId;
          if (!counts[key]) {
            counts[key] = { label: v.optionLabel, votes: 0 };
          }
          counts[key].votes += 1;
        });

        setVotes(Object.values(counts));
      } catch (err) {
        console.error("Results fetch error:", err);
        setError(
          err instanceof TypeError
            ? "Could not reach the server. Check your connection or the API URL."
            : err.message,
        );
      } finally {
        setLoading(false);
      }
    }

    getResults();
  }, [pollId]);

  const totalVotes = votes.reduce((sum, v) => sum + v.votes, 0);

  if (loading) return <div className="results-loading">Loading results…</div>;
  if (error) return <div className="results-error">{error}</div>;

  return (
    <div className="results-page">
      <div className="results-card">
        <div className="vote-bars">
          {votes.map((item, index) => {
            const pct = totalVotes > 0 ? (item.votes / totalVotes) * 100 : 0;
            return (
              <div className="bar-row" key={index}>
                <div className="bar-label-row">
                  <span className="bar-label">{item.label}</span>
                  <span className="bar-count">
                    {item.votes} vote{item.votes !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${pct}%` }} />
                </div>
                <div className="bar-meta">
                  <span className="bar-pct">{pct.toFixed(1)}%</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="results-footer">
          <strong>Total votes:</strong> {totalVotes}
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;