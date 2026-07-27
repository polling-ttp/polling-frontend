function OptionCard({ option, addVote, selected }) {
  return (
    <button
      className={`option-button${selected ? " selected" : ""}`}
      onClick={addVote}
      type="button"
    >
      <span>{option.text}</span>
      <span aria-hidden="true">{selected ? "✓" : "→"}</span>
    </button>
  );
}

export default OptionCard;
