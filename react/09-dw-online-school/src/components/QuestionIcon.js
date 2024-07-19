import React from "react";
import cn from "classnames";
import styles from "./QuestionIcon.module.css";
import personImg from "../assets/person.png";

function QuestionIcon({ className, photo }) {
  return (
    <img
      className={cn(styles.questionIcon, className)}
      src={photo ? photo : personImg}
    />
  );
}
export default QuestionIcon;
