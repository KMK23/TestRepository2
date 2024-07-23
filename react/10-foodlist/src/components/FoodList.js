import React, { useState } from "react";
import "./FoodList.css";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}.${date.getDate()}`;
}

function FoodListItem({ item }) {
  const { title, calorie, content, imgUrl, createdAt, id } = item;

  return (
    <div className="FormListItem">
      <img className="FormListItem-img" src={imgUrl} />
      <div className="FormListItem-row">
        <div className="FormList-title-calorie">
          <h1 className="FormListItem-title">{title}</h1>
          <p className="FormListItem-calorie">{`${calorie}kal`}</p>
        </div>
        <p className="FormListItem-content">{content}</p>
        <p className="FormListItem-date">{formatDate(createdAt)}</p>
        <div className="FormListItem-buttons">
          <button className="FormListItem-edit">수정</button>
          <button className="FormListItem-delete">삭제</button>
        </div>
      </div>
    </div>
  );
}

function FoodList({ items }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <ul className="FormList">
      {items.map((item) => (
        <li key={item.id}>
          <FoodListItem item={item} />
        </li>
      ))}
    </ul>
  );
}

export default FoodList;
