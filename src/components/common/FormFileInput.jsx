function FormFileInput({
  label,
  name,
  onChange,
  accept = "image/*",
  multiple = false,
  required = false,
  error,
  preview,
  previewStyle,
}) {
  return (
    <div className="form-field">
      {label && (
        <label htmlFor={name}>
          {label}
          {required && " (*)"}
        </label>
      )}
      <input
        id={name}
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        style={{ paddingTop: 10 }}
        onChange={onChange}
      />
      {preview && (
        <img
          src={preview}
          alt=""
          style={previewStyle ?? { width: 100, marginBottom: 10 }}
        />
      )}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

export default FormFileInput;
