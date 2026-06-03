function ImagePreviewGrid({ files, style }) {
  if (!files?.length) return null;

  const defaultStyle = {
    maxWidth: "100px",
    maxHeight: "100px",
    margin: "10px",
  };

  return (
    <>
      {files.map((file, index) => (
        <img
          key={`${file.name}-${index}`}
          src={URL.createObjectURL(file)}
          alt=""
          style={style ?? defaultStyle}
        />
      ))}
    </>
  );
}

export default ImagePreviewGrid;
