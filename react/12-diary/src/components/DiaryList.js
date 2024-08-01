import React, { useEffect, useState } from "react";
import Button from "./Button";
import "./DiaryList.css";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";

const sortOptionList = [
  { name: "최신순", value: "latest" },
  { name: "오래된 순", value: "oldest" },
];
const filterOptionList = [
  { name: "전부다", value: "all" },
  { name: "좋은 감정만", value: "good" },
  { name: "안좋은 감정만", value: "bad" },
];

function ControlMenu({ optionList, value, onChange }) {
  console.log(value);
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((option, idx) => {
        return (
          <option key={idx} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
}

function DiaryList({ diaryList }) {
  const navigate = useNavigate();
  const [order, setOrder] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getSortedDiaryList = () => {
    // 필터링 함수
    const getFilteredList = () => {
      // filter state 가 good이면(emotion의 값이 3보다 작거나 같을때)
      if (filter === "all") {
        return diaryList;
      } else if (filter === "good") {
        return diaryList.filter((diary) => diary.emotion <= 3);
      } else {
        return diaryList.filter((diary) => diary.emotion > 3);
      }

      // filter state 가 good 이 아니면(emotion 값이 3보다 클때)
    };
    // 정렬 함수
    // const compare
    // 원래 보통 정렬 함수를 만들때(sort 함수 쓸때) compare라고 이름 씀

    const getOrderedList = () => {};

    console.log(order);
    const filterdList = diaryList.filter((diary) => getFilteredList(diary));
    const sortedList = filterdList.sort(getOrderedList);
    return sortedList;
  };

  useEffect(() => {
    getSortedDiaryList();
  }, [order, filter]);
  return (
    <div className="diaryList">
      <div className="menu_wrapper">
        <div className="control_menus">
          <ControlMenu
            optionList={sortOptionList}
            value={order}
            onChange={setOrder}
          />
          <ControlMenu
            optionList={filterOptionList}
            value={filter}
            onChange={setFilter}
          />
        </div>
        <div className="new_btn">
          <Button
            text={"새 일기쓰기"}
            type="positive"
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {diaryList.map((diary) => (
        <DiaryItem {...diary} key={diary.id} />
      ))}
    </div>
  );
}

export default DiaryList;
