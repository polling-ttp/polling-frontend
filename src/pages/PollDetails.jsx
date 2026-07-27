import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OptionCard from "../components/OptionCard";
import { API_URL } from "../api";

function PollDetails() {
  const [poll, setPoll] = useState(null);
  const [error, setError] = useState(null);
  const [votedOption, setVotedOption] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const url = API_URL + `/api/polls/${Number(id)}`;
    async function getOptions() {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("We couldn't load this poll.");
        const data = await response.json();
        setPoll(data);
      } catch (error) {
        setError(error.message);
      }
    }

    getOptions();
  }, [id]);

  async function addVote(optionId) {
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/polls/${optionId}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Your vote couldn't be saved.");
      setVotedOption(optionId);
    } catch (error) {
      setError(error.message);
    }
  }

  if (error && !poll) return <div className="message error-message">{error}</div>;
  if (!poll) return <div className="message">Loading poll…</div>;

  return (
    <section className="page narrow-page">
      <button className="back-link" onClick={() => navigate("/")}>
        ← All polls
      </button>
      <header className="page-header left-aligned">
        <span className="eyebrow">Cast your vote</span>
        <h1>{poll.title}</h1>
        <p>{poll.description}</p>
      </header>
      {error && <div className="message error-message">{error}</div>}
      {votedOption && (
        <div className="message success-message">
          Vote saved! You can view the live results below.
        </div>
      )}
      {poll.Options?.length === 0 && (
        <div className="empty-state">
          <h2>No choices available</h2>
          <p>This poll does not have any answer choices yet.</p>
        </div>
      )}
      <div className="options-grid">
        {poll.Options?.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            addVote={() => addVote(option.id)}
            selected={votedOption === option.id}
          />
        ))}
      </div>
      {poll.Options?.length > 0 && (
        <button
          className="button secondary-button results-button"
          onClick={() => navigate(`/polls/${id}/results`)}
        >
          View live results
        </button>
      )}
    </section>
  );
}

export default PollDetails;
