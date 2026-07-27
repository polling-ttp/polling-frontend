import { Link } from "react-router-dom";

function PollCard({ poll, onDelete }) {
  return (
    <article className="poll-card">
      <div className="poll-card-copy">
        <span className="poll-number">Poll #{poll.id}</span>
        <h2>{poll.title}</h2>
        <p>{poll.description}</p>
      </div>
      <div className="card-actions">
        <Link className="button primary-button" to={`/polls/${poll.id}`}>
          Vote now
        </Link>
        <button
          className="button danger-button"
          type="button"
          onClick={() => onDelete(poll.id)}
          aria-label={`Delete ${poll.title}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default PollCard;
