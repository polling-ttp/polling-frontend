import { useState } from "react";
import PollDetails from '../pages/PollDetails'
function AddPollCard({ addPoll }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [option, setOption] = useState("");
  const [options, setOptions] = useState([]);

  // const newPoll = {
  //   title,
  //   description,
  //   options,
  // };

  function addOptions() {
    if (!option.trim()) return;
    setOptions([...options, { text: option }])
    setOption("")
  }

  function handleSubmit(event) {
    event.preventDefault();
     const newPoll = {
      poll: { title, description },
      options: options.map((opt) => opt.text),
     }
    addPoll(newPoll);
  }

  // console.log(title);
  // console.log(description);
  // console.log(option);
  // console.log(options);
  // console.log(newPoll);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter New Poll For More Fun</label>
        <hr />
        <input
          type="text"
          placeholder="Enter Poll Tilte"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Poll Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
       <div>
  <input
    type="text"
    placeholder="Enter Options"
    value={option}
    onChange={(e) => setOption(e.target.value)}
  />
  <button type="button" onClick={addOptions}>
    Add Options
  </button>
</div>

{options.length > 0 && (
  <ul>
    {options.map((opt, i) => (
      <li key={i}>
        {opt.text}
        <button
          type="button"
          onClick={() => setOptions(options.filter((_, idx) => idx !== i))}
        >
          Remove
        </button>
      </li>
    ))}
  </ul>
)}
        <button type="submit">Submit Poll</button>
      </form>
    </div>
  );
}

export default AddPollCard;
