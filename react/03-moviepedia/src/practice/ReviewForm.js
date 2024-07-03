import React from "react";
import FileInput from "./FileInput";
import RatingStar from "./RatingStar";
import "./ReviewForm.css";

function ReviewForm(props) {
  return (
    <form className="ReviewForm">
      <FileInput />
      <input type="text" placeholder="제목" />
      <RatingStar />
      <textarea placeholder="내용" />
      <button>확인</button>
    </form>
  );
}

export default ReviewForm;
