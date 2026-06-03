function FormPanel({ title, children, className = "", wide = true }) {
  const panelClass = wide
    ? `signup-form col-sm-8 padding-right ${className}`
    : `signup-form ${className}`;

  return (
    <div className={panelClass.trim()} style={{ marginBottom: 10 }}>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
}

export default FormPanel;
