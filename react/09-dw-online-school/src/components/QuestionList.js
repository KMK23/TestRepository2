import React from "react";
import Card from "./Card";
import styles from "./QuestionList.module.css";
import { Link } from "react-router-dom";

import QuestionIcon from "./QuestionIcon";

function QuestionList({ question }) {
  console.log(question);
  const { createdAt, title, writer } = question;
  console.log(writer.profile.photo);

  const date = createdAt.split("T")[0];

  return (
    <div className={styles.questionList}>
      <Card className={styles.className}>
        <div className={styles.info}>
          <p className={styles.title}>
            <Link>{title}</Link>
            <span className={styles.count}>[1]</span>
          </p>
          <p className={styles.date}>{date}</p>
        </div>
        <div className={styles.writer}>
          <QuestionIcon photo={writer.profile.photo} />
        </div>
      </Card>
    </div>
  );
}

export default QuestionList;
