import React from "react";
import placehorderImg from "../assets/preview-placeholder.png";
import resetImg from "../assets/ic-reset.png";
import "./FileInput.css";
function FileInput(props) {
  return (
    <div className="FileInput">
      <img src={placehorderImg} alt="" className="FileInput-previewImg" />
      <input type="file" className="FileInput-hidden-overlay" />
      <button className="FileInput-clear-button">
        <img src={resetImg} alt="" />
      </button>
    </div>
  );
}

export default FileInput;
