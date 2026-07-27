import { useEffect, useState } from "react";
import PollCard from "./../components/PollCard";
import { API_URL } from "../api";

function Home() {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPolls() {
      try {
        const response = await fetch(API_URL + "/api/polls");
        if (!response.ok) throw new Error("We couldn't load the polls.");
        const data = await response.json();
        setPolls(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadPolls();
  }, []);




  async function deletePoll(id) {
    try {
      const response = await fetch(`${API_URL}/api/polls/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("We couldn't delete that poll.");
      setPolls((previousPolls) =>
        previousPolls.filter((poll) => poll.id !== id),
      );
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className="page">
      <header className="page-header">
        <span className="eyebrow">Community polls</span>
        <h1>What does everyone think?</h1>
        <p>Pick a poll, cast your vote, and see how your choice compares.</p>
      </header>

      {error && <div className="message error-message">{error}</div>}
      {loading && <div className="message">Loading polls…</div>}
      {!loading && polls.length === 0 && (
        <div className="empty-state">
          <h2>No polls yet</h2>
          <p>Create the first one and get the conversation started.</p>
        </div>
      )}

      <div className="poll-grid">
        {polls.map((poll) => (
          <PollCard key={poll.id} poll={poll} onDelete={deletePoll} />
        ))}
      </div>
    </section>
  );
}

export default Home;
