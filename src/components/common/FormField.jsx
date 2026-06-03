function FormField({
  label,
  name,
  type = "text",
  value,
  onChange = () => {},
  placeholder,
  readOnly = false,
  required = false,
  error,
  className = "",
}) {
  return (
    <div className={`form-field ${className}`.trim()}>
      {label && (
        <label htmlFor={name}>
          {label}
          {required && " (*)"}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
      />
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

export default FormField;
