import React from "react";
import placeholderImg from "./assets/preview-placeholder.png";
import "./FileInput.css";
import resetImg from "./assets/ic-reset.png";
function FileInput(props) {
  return (
    <div className="FileInput">
      <img src={placeholderImg} alt="사진" className="FileInput-preview" />
      <input type="file" className="FileInput-hidden-overlay" />
      <button className="FileInput-clear-button">
        <img src={resetImg} alt="" />
      </button>
    </div>
  );
}

export default FileInput;
