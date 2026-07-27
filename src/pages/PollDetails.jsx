import { useState, useEffect } from "react";
import { useParams } from "react-router";
import OptionCard from "../components/OptionCard";
import { useNavigate } from "react-router";


function PollDetails() {
  const [poll, setPoll] = useState(null);
  const [options, setOptions] = useState([]);
  const [votes, setVotes] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const API_URL = "http://localhost:8000";
  const navigate = useNavigate();

  useEffect(() => {
    const url = API_URL + `/polls/${Number(id)}`;
    async function getOptions() {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to Get Options.");
        const data = await response.json();
        setPoll(data)
        setOptions([...data.Options]);
        setVotes([...data.Options.Votes]);
      } catch (error) {
        setError(error.message);
      }
    }

    getOptions();
  }, []);

 async function addVote(optionId) {
  const url = `${API_URL}/api/polls/${optionId}/vote`;
  try {
    const response = await fetch(url, { method: "POST" });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    setError(error.message);
  }
}

    if (!poll) return <p>Loading...</p>;

  return (
    <div>
      <h1>{poll.title}</h1>
      <p>{poll.description}</p>
      <div className="options-grid">
        {options.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            addVote={() => addVote(option.id)}
          ></OptionCard>
        ))}
      </div>
      <button onClick={() => navigate(`/polls/${id}/results`)}>
        Who got the most Votes!
      </button>
    </div>
  );
}

export default PollDetails;
