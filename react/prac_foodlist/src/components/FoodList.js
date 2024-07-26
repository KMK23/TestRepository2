import FoodForm from "./FoodForm";
import "./FoodList.css";
import { useState } from "react";

const formatDate = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
};

function FoodListItem({ item, handleDelete, onEdit }) {
  const { imgUrl, title, calorie, content, createdAt, docId } = item;

  const handleDeleteClick = () => {
    handleDelete(docId, imgUrl);
  };

  const handleEditClick = () => {
    onEdit(item.id);
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
            <button
              className="FoodListItem-edit-button"
              onClick={handleEditClick}
            >
              수정
            </button>
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

function FoodList({ items, handleDelete, onUpdate, onUpdateSuccess }) {
  console.log(items);
  const [editingId, setEditingId] = useState(null);

  return (
    <ul className="FoodList">
      {items.map((item) => {
        if (item.id === editingId) {
          const { title, calorie, content, imgUrl, docId } = item;
          const initialValues = { title, calorie, content, imgUrl: null };

          function handleSubmit(collectionName, dataObj) {
            const result = onUpdate(collectionName, dataObj, docId, imgUrl);
            return result;
          }

          const onSubmitSuccess = (result) => {
            onUpdateSuccess(result);
            setEditingId(null);
          };

          return (
            <li key={item.id}>
              <FoodForm
                onSubmit={handleSubmit}
                onCancel={setEditingId}
                initialValues={initialValues}
                initialPreview={imgUrl}
                onSubmitSuccess={onSubmitSuccess}
              />
            </li>
          );
        }
        return (
          <li key={item.id}>
            <FoodListItem
              item={item}
              handleDelete={handleDelete}
              onEdit={setEditingId}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;
