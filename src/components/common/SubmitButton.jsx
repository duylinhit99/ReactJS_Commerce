function SubmitButton({ label = "Submit", className = "btn btn-default" }) {
  return (
    <button type="submit" className={className}>
      {label}
    </button>
  );
}

export default SubmitButton;
