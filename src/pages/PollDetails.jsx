import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_LOCAl_URL = "http://localhost:8000";

function Details() {
  const { id } = useParams();
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadOptions() {
      try {
        const response = await fetch(`${API_LOCAl_URL}/polls/${id}`);
        if (!response.ok) throw new Error("Failed to Load the Polls.");
        const data = response.json();
        setOptions(data);
      } catch (error) {}
    }
    loadOptions();
  }, []);

  return (
    <div>
      <h1>Poll Details</h1>
      
    </div>
  );
}

export default Details;
