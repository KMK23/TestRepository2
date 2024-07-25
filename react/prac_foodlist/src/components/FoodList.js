import React from "react";
import "./FoodList.css";

const formatDate = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
};

function FoodListItem({ item, handleDelete }) {
  const { imgUrl, title, calorie, content, createdAt, docId } = item;
  console.log(item);

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
  console.log(items);
  return (
    <ul className="FoodList">
      {items.map((item) => (
        <li>
          <FoodListItem item={item} handleDelete={handleDelete} />
        </li>
      ))}
    </ul>
  );
}

export default FoodList;
