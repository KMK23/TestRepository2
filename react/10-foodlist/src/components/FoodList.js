import React, { useState } from "react";
import "./FoodList.css";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}.${date.getDate()}`;
}

function FoodListItem({ item, handleDelete }) {
  const { title, calorie, content, imgUrl, createdAt, id, docId } = item;
  const handleDeleteClick = () => {
    handleDelete(docId, imgUrl);
  };

  return (
    <div className="FoodListItem">
      <img className="FoodListItem-preview" src={imgUrl} />
      <div className="FoodListItem-rows">
        <div className="FoodListItem-title-calorie">
          <h1 className="FoodListItem-title">{title}</h1>
          <span className="FoodListItem-calorie">{calorie}Kcal</span>
        </div>
        <p className="FoodListItem-content">{content}</p>
        <div className="FoodListItem-date-buttons">
          <p className="FoodListItem-date">{formatDate(createdAt)}</p>
          <div className="FoodListItem-buttons">
            <button className="FoodListItem-edit-button">수정</button>
            <button
              className="FoodListItem-delete-button"
              onClick={handleDeleteClick}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FoodList({ items, handleDelete }) {
  return (
    <ul className="FoodList">
      {items.map((item) => (
        <li key={item.id}>
          <FoodListItem item={item} handleDelete={handleDelete} />
        </li>
      ))}
    </ul>
  );
}

export default FoodList;
