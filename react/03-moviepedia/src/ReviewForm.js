import React from "react";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import "./ReviewForm.css";

function ReviewForm(props) {
  return (
    <form className="ReviewForm">
      <div>
        <FileInput />
      </div>
      <div className="Form-container">
        <input type="text" placeholder="제목" />
        <RatingInput />
        <textarea placeholder="내용" />
        <button>확인</button>
      </div>
    </form>
  );
}

export default ReviewForm;
