import React from "react";
import FileInput from "./FileInput";
import "./FoodForm.css";
import { useState, useEffect } from "react";
import { addDatas, getDatas } from "../api/firebase";

const INITIAL_VALUES = {
  title: "",
  content: "",
  calorie: 0,
  imgUrl: null,
};

function sanitize(type, value) {
  switch (type) {
    case "number":
      return Number(value) || 0;

    default:
      return value;
  }
}

function FoodForm({ onSubmit, onSubmitSuccess }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name, value) => {
    console.log(values);
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    console.log(e.target);
    handleChange(name, sanitize(type, value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const resultData = await onSubmit("foods", values);
    onSubmitSuccess(resultData);

    setIsSubmitting(false);
    setValues(INITIAL_VALUES);
  };
  return (
    <form className="FoodForm" onSubmit={handleSubmit}>
      <FileInput name="imgUrl" value={values.imgUrl} onChange={handleChange} />
      <div className="FoodForm-rows">
        <div className="FoodForm-title-calorie">
          <input
            className="FoodForm-title"
            type="text"
            name="title"
            value={values.title}
            placeholder="이름입력"
            onChange={handleInputChange}
          />
          <input
            className="FoodForm-calorie"
            type="number"
            name="calorie"
            value={values.calorie}
            onChange={handleInputChange}
          />
          <button
            className="FoodForm-submit-button"
            type=""
            disabled={isSubmitting}
          >
            수정
          </button>
          <button
            className="FoodForm-submit-button"
            type="submit"
            disabled={isSubmitting}
          >
            확인
          </button>
        </div>
        <textarea
          className="FoodForm-content"
          name="content"
          value={values.content}
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
}

export default FoodForm;
