import React, { useEffect, useState } from "react";
import ListPage from "../components/ListPage";
import styles from "./QustionListPage.module.css";
import searchImg from "../assets/search.svg";

import { getDatas } from "../api/firebase";
import QuestionList from "../components/QuestionList";

let questionListItem;

function QuestionListPage(props) {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    const resultData = await getDatas("questions");
    questionListItem = resultData;
    setItems(resultData);
  };

  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <ListPage variant="community">
      <form className={styles.form}>
        <input placeholder="검색으로 코스 찾기" />
        <button>
          <img src={searchImg} />
        </button>
      </form>
      <p className={styles.count}>총 00개 질문</p>
      <div className={styles.questionList}>
        {items.map((question) => {
          return <QuestionList question={question} />;
        })}
      </div>
    </ListPage>
  );
}

export default QuestionListPage;
