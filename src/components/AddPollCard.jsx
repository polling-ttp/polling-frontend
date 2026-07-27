import { useState } from "react";

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
    if (!title.trim() || !description.trim() || options.length < 2) return;
    const newPoll = {
      poll: { title, description },
      options: options.map((opt) => opt.text),
    };
    addPoll(newPoll);
  }

  // console.log(title);
  // console.log(description);
  // console.log(option);
  // console.log(options);
  // console.log(newPoll);

  return (
    <section className="page narrow-page">
      <header className="page-header left-aligned">
        <span className="eyebrow">Start a conversation</span>
        <h1>Create a poll</h1>
        <p>Write a clear question and add at least two choices.</p>
      </header>
      <form className="poll-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="poll-title">Poll title</label>
        <input
          id="poll-title"
          type="text"
          placeholder="What would you like to ask?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        </div>
        <div className="form-field">
          <label htmlFor="poll-description">Description</label>
        <input
          id="poll-description"
          type="text"
          placeholder="Add a little context"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        </div>
        <div className="form-field">
          <label htmlFor="poll-option">Answer choices</label>
          <div className="option-entry">
            <input
              id="poll-option"
              type="text"
              placeholder="Add an option"
              value={option}
              onChange={(e) => setOption(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addOptions();
                }
              }}
            />
            <button className="button secondary-button" type="button" onClick={addOptions}>
              Add
            </button>
          </div>
        </div>
        {options.length > 0 && (
          <ul className="option-list">
            {options.map((item, index) => (
              <li key={`${item.text}-${index}`}>
                {item.text}
                <button
                  className="button danger-button"
                  type="button"
                  onClick={() =>
                    setOptions(options.filter((_, itemIndex) => itemIndex !== index))
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <button
          className="button primary-button"
          type="submit"
          disabled={options.length < 2}
        >
          Create poll
        </button>
      </form>
    </section>
  );
}

export default AddPollCard;
