import { useState, useCallback } from "react";

export function useMultiImageUpload() {
  const [files, setFiles] = useState([]);

  const handleFileChange = useCallback((e) => {
    const selected = e.target.files;
    if (!selected?.length) return;
    setFiles((prev) => [...prev, ...Array.from(selected)]);
  }, []);

  const reset = useCallback(() => setFiles([]), []);

  return { files, setFiles, handleFileChange, reset };
}
