import React from "react";
import searchImg from "../assets/ic-search.png";
import "./SearchInput.css";
function SearchInput(props) {
  return (
    <div className="input-container">
      <input type="text" className="input" />
      <img src={searchImg} className="inputImg" />
    </div>
  );
}

export default SearchInput;
