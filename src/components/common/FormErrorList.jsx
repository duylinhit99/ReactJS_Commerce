function FormErrorList({ errors }) {
  const messages = Object.values(errors || {}).filter(Boolean);
  if (messages.length === 0) return null;

  return (
    <ul className="form-error-list">
      {messages.map((message, index) => (
        <li key={index} style={{ listStyle: "none", color: "red" }}>
          {message}
        </li>
      ))}
    </ul>
  );
}

export default FormErrorList;
