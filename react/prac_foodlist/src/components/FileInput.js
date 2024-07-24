import placeholderImg from "../assets/preview-placeholder.png";
import resetImg from "../assets/ic-reset-white.png";
import "./FileInput.css";
import { useState, useEffect } from "react";

function FileInput({ onChange, name, value }) {
  const [preview, setPreview] = useState();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    console.log(nextPreview);
    setPreview(nextPreview);
    return () => {
      setPreview(null);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div className="FileInput">
      <img
        src={preview || placeholderImg}
        className={`FileInput-preview ${preview ? "selected" : ""}`}
      />
      <input
        type="file"
        className="FileInput-hidden-overlay"
        onChange={handleChange}
      />
      {value && (
        <button
          className="FileInput-clear-button"
          type="button"
          onClick={handleClearClick}
        >
          <img src={resetImg} />
        </button>
      )}
    </div>
  );
}

export default FileInput;
