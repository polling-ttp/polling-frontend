import Home from "./../pages/Home";
import { useNavigate, Link} from "react-router-dom";
const API_URL = "http://localhost:8000";
function PollCard({ poll , onDelete}) {
  const navigate = useNavigate();
  return (
    <ul>
      <li key={poll.id}>
        {poll.title} {poll.description}
      </li>
      <Link to={`/polls/${poll.id}`}>
        <button type="button">See Poll</button>
      </Link>
      <button type="button" onClick={() => onDelete(poll.id)}> Delete Poll </button>
    </ul>
  );
}

export default PollCard;
