import { useEffect, useState } from "react";
import PollCard from "./../components/PollCard";
import AddPollCard from "./../components/AddPollCard";

const API_LOCAl_URL = "http://localhost:8000";

function Home() {
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPolls() {
      try {
        const response = await fetch(API_LOCAl_URL + "/api/polls");
        if (!response.ok) throw new Error("Failed to Load the Polls.");
        const data = await response.json();
        setPolls([...data]);
      } catch (error) {
        setError(error.message);
      }
    }
    loadPolls();
  }, []);

  //This was moved to CreatePoll to separate the pages and let them work with the Navbar
  // async function addPoll(newPoll) {
  //   const response = await fetch(API_LOCAl_URL + '/api/polls', {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newPoll),
  //   });
  //   const data = await response.json();
  //   setPolls([...polls, data]);
  // }


async function deletePoll(id) {
  console.log("Deleting poll with id:", id);
  try {
    const response = await fetch(`${API_LOCAl_URL}/api/polls/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete poll");
    setPolls((prev) => prev.filter((poll) => poll.id !== id));
  } catch (err) {
    setError(err.message);
  }
}
  return (
    <div>
      {/* <AddPollCard addPoll={addPoll}></AddPollCard> */}
      <hr />
      <div>
        {polls.map((poll) => (
          <PollCard key={poll.id} poll={poll} onDelete={deletePoll} />
          // <PollCard key={poll.id} poll={poll}></PollCard>
        ))}
      </div>
    </div>
  );
}

export default Home;
