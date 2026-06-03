function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
}) {
  return (
    <div className="form-field">
      {label && (
        <label htmlFor={name}>
          {label}
          {required && " (*)"}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

export default FormTextarea;
