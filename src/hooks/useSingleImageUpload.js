import { useState, useCallback } from "react";

export function useSingleImageUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = useCallback((e) => {
    const files = e.target.files;
    if (!files?.length) return;
    const selected = files[0];
    setFile(selected);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(selected);
  }, []);

  const reset = useCallback(() => {
    setFile(null);
    setPreview("");
  }, []);

  return { file, preview, setPreview, handleFileChange, reset };
}
