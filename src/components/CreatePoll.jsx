import { useNavigate } from "react-router-dom";
import AddPollCard from "../components/AddPollCard";
import { useState } from "react";
import { API_URL } from "../api";

function CreatePoll() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function addPoll(newPoll) {
    try {
      const response = await fetch(`${API_URL}/api/polls`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPoll),
      });
      if (!response.ok) throw new Error("We couldn't create this poll.");
      await response.json();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      {error && <div className="message error-message">{error}</div>}
      <AddPollCard addPoll={addPoll} />
    </>
  );
}

export default CreatePoll;
