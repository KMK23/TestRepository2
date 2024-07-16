import React from "react";
import ListPage from "../components/ListPage";
import styles from "../components/ListPage.module.css";
import Question from "../assets/community.svg";

function QuestionListPage(props) {
  return (
    <ListPage
      heading="질문이뭐였쬬?"
      description="내용이 뭐였쬬?"
      className={styles.community}
      image={Question}
    ></ListPage>
  );
}

export default QuestionListPage;
