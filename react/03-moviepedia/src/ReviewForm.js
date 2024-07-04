import React, { useState } from "react";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import "./ReviewForm.css";

function ReviewForm(props) {
  const [values, setValues] = useState({});

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.name, e.target.value);
    handleChange(name, value);
  };

  return (
    <form className="ReviewForm">
      <div>
        <FileInput name="imgUrl" setFile={handleChange} />
      </div>
      <div className="Form-container">
        <input
          type="text"
          placeholder="제목"
          onChange={handleInputChange}
          name="title"
        />
        <RatingInput />
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
