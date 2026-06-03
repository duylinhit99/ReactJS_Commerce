function FormSelect({
  label,
  name,
  value,
  onChange,
  required = false,
  error,
  placeholder,
  children,
}) {
  return (
    <div className="form-field">
      {label && (
        <label htmlFor={name}>
          {label}
          {required && " (*)"}
        </label>
      )}
      <select id={name} name={name} value={value ?? ""} onChange={onChange}>
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

export default FormSelect;
