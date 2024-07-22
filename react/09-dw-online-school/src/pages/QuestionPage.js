import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import styles from "./QuestionPage.module.css";
import Writer from "../components/Writer";
import Answer from "../components/Answer";
import { useLocation, useParams } from "react-router-dom";

function QuestionPage({}) {
  const props = useLocation();
  console.log(props);
  const { pathname, state } = props;
  //   const slug = useParams();
  //   console.log(slug);
  console.log(state.question.answers);
  const [stateInfo, setStateInfo] = useState([]);

  useEffect(() => {
    setStateInfo(state.question);
  }, []);

  return (
    <>
      <div className={styles.header}>
        <Container>
          <div className={styles.question}>
            <div className={styles.questionInfo}>
              <div className={styles.content}>
                <div className={styles.title}>{stateInfo?.title}</div>
                <div className={styles.date}>{stateInfo?.createdAt}</div>
              </div>
              <Writer className={styles.author} />
            </div>
            <p className={styles.content}>{stateInfo.content}</p>
          </div>
        </Container>
      </div>
      <Container className={styles.answers}>
        <h2 className={styles.count}>{state.question.answers.length}개 답변</h2>
        <Answer state={stateInfo} />
      </Container>
    </>
  );
}

export default QuestionPage;
