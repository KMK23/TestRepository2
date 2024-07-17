import React, { useEffect, useState } from "react";
import ListPage from "../components/ListPage";
import searchImg from "../assets/search.svg";
import styles from "./CourseListpage.module.css";
import CourseItem from "../components/CourseItem";
import { getDatas } from "../api/firebase";

let listItem;

function CourseListPage(props) {
  const [items, setItems] = useState([]);
  const [typing, setTyping] = useState("");
  const handleLoad = async () => {
    // 파이어베이스의 courses 컬렉션의 데이터를 가져와.
    const resultData = await getDatas("courses");
    // 전체데이터 변수에 저장
    listItem = resultData;
    // 가져온 데이터 콘솔로 확인
    // console.log(resultData);
    // items state에 set 해준다.
    setItems(resultData);
  };

  const handleKeywordChange = (e) => {
    // 사용자가 입력한 키워드를 state에 저장한다.
    setTyping(e.target.value);
    console.log(typing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 전체 데이터를 가지고 있는 listItems를 활용해 사용자가 입력한 키워드를 타이틀에 포함하고있는 객체를 원소로 가지는 배열을 만든다.
    const filterItem = listItem.filter((aa) => {
      // console.log(aa.title);
      // console.log(typing);
      return aa.title.includes(typing);
    });

    // 만든 배열을 items state 에 set 해준다.
    setItems(filterItem);
    // setItems(listItem.filer(({title})=>title.includes(typing)))
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <ListPage variant="catalog">
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          placeholder="검색으로 코스 찾기"
          onChange={handleKeywordChange}
          value={typing}
        />
        <button>
          <img src={searchImg} />
        </button>
      </form>
      <p className={styles.count}>총 {items.length}개 코스</p>
      <div className={styles.courseList}>
        {items.map((course, idx) => (
          <CourseItem item={course} key={idx} />
        ))}
      </div>
    </ListPage>
  );
}

export default CourseListPage;
