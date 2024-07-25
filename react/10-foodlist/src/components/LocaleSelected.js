import React from "react";
import { useLocale, useSetLocale } from "../contexts/FoodContext";

function LocaleSelected(props) {
  // const locale = useLocale();
  // const setLocale = useSetLocale();

  // const handleChange = (e) => {
  //   setLocale(e.target.value);
  // };

  return (
    <select>
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  );
}

export default LocaleSelected;
