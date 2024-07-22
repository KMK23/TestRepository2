import React, { useEffect, useState } from "react";
import ListPage from "../components/ListPage";
import styles from "./QustionListPage.module.css";
import searchImg from "../assets/search.svg";
import { getDatas } from "../api/firebase";
import QuestionItem from "../components/QuestionItem";

let questionListItem;

function QuestionListPage(props) {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    const resultData = await getDatas("questions");
    questionListItem = resultData; //검색용으로 사용할 전체 데이터를 가지고 있어야 한다.
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
      <p className={styles.count}>총 {items.length}개 질문</p>
      <div className={styles.questionList}>
        {items.map((question) => (
          <QuestionItem question={question} key={question.docId} />
        ))}
      </div>
    </ListPage>
  );
}

export default QuestionListPage;
