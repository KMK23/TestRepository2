import React, { useState } from "react";
import FileInput from "./FileInput";
import RatingStar from "./RatingStar";
import "./ReviewForm.css";

function ReviewForm(props) {
  const [values, setValues] = useState({});

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.name, e.target.value);
    handleChange(name, value);
  };

  return (
    <form className="ReviewForm">
      <div>
        <FileInput setFile={handleChange} name="imgUrl" />
      </div>
      <div className="Form-container">
        <input
          type="text"
          placeholder="제목"
          onChange={handleInputChange}
          name="title"
        />
        <RatingStar />
        <textarea
          placeholder="내용"
          onChange={handleInputChange}
          name="content"
        />
        <button>확인</button>
      </div>
    </form>
  );
}

export default ReviewForm;
