import { useNavigate } from "react-router-dom";
import AddPollCard from "../components/AddPollCard";

const API_LOCAL_URL = "http://localhost:8000";

function CreatePoll() {
  const navigate = useNavigate();

  async function addPoll(newPoll) {
    try {
      const response = await fetch(`${API_LOCAL_URL}/api/polls`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPoll),
      });
      if (!response.ok) throw new Error("Failed to create poll");
      await response.json();
      navigate("/"); // back to Home after success
    } catch (err) {
      console.error(err);
      
    }
  }

  return <AddPollCard addPoll={addPoll} />;
}

export default CreatePoll;