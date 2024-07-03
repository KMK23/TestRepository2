import React from "react";
import Rating from "../Rating";

function ReviewListItem() {
  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" />
      <div className="ReviewListItem-rows">
        <h1 className="ReviewListItem-title">라라랜드</h1>
        <Rating className="ReviewListItem-rating" />
        <p className="ReviewListItem-date">날짜</p>
        <p className="ReviewListItem-content">내용</p>
        <div className="ReviewListItem-buttons">
          <button className="ReviewListItem"></button>
        </div>
      </div>
    </div>
  );
}

function ReviewList(props) {
  return <ul className="ReviewList"></ul>;
}

export default ReviewList;
