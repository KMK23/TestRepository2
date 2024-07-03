import React from "react";
import Rating from "./Rating";
import src from "./assets/764e74efc2eca6a270a3b5e71d3189d3.jpg";
import "./ReviewList.css";

function ReviewListItem() {
  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" alt="" src={src} />
      <div className="ReviewListItem-rows">
        <h1 className="ReviewListItem-title">라라랜드</h1>
        <Rating className="ReviewListItem-rating" />
        <p className="ReviewListItem-date">2024.07.03</p>
        <p className="ReviewListItem-content">영화 리뷰 내용</p>
        <div className="ReviewListItem-buttons">
          <button className="ReviewListItem-edit-button">수정</button>
          <button className="ReviewListItem-delete-button">삭제</button>
        </div>
      </div>
    </div>
  );
}

function ReviewList(props) {
  return (
    <ul className="ReviewList">
      <li>
        <ReviewListItem />
      </li>
    </ul>
  );
}

export default ReviewList;
