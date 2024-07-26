import React from "react";
import { useLocale, useSetLocale } from "../contexts/LocaleContext";

function LocaleSelect(props) {
  const locale = useLocale();
  const setLocale = useSetLocale();
  debugger;
  const handleChange = (e) => {
    setLocale(e.target.value);
  };

  return (
    <select onChange={handleChange} value={locale}>
      <option value="ko">한국어</option>
      <option value="en">영어</option>
    </select>
  );
}

export default LocaleSelect;
