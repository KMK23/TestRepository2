import React from "react";
import placehorderImg from "../assets/preview-placeholder.png";
import resetImg from "../assets/ic-reset.png";
import "./FileInput.css";

function FileInput({ setFile, name }) {
  const handleFileChange = (e) => {
    const nextFile = e.target.files[0];
    setFile(name, nextFile);
  };

  return (
    <div className="FileInput">
      <img src={placehorderImg} alt="" className="FileInput-previewImg" />
      <input
        type="file"
        accept="image/*"
        className="FileInput-hidden-overlay"
        onChange={handleFileChange}
      />
      <button className="FileInput-clear-button">
        <img src={resetImg} alt="" />
      </button>
    </div>
  );
}

export default FileInput;
