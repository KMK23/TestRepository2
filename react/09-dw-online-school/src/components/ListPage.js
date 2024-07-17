import React, { useState } from "react";
import Container from "./Container";
import styles from "./ListPage.module.css";
import catalog from "../assets/catalog.svg";
import cn from "classnames";
import question from "../assets/community.svg";

const dataDict = {
  catalog: {
    src: catalog,
    title: "모든코스",
    description: "자체 제작된 코스들로 기초를 쌓으세요",
  },
  community: {
    src: question,
    title: "커뮤니티",
    description: "DW온라인스쿨의 2만 수강생들과 함께 공부해봐요",
  },
};

function ListPage({ variant, children }) {
  const { src, title, description } = dataDict[variant];
  return (
    <>
      <div className={cn(styles.bg, styles[variant])}>
        <img className={styles.icon} src={src} />
        <div className={styles.texts}>
          <h1 className={styles.heading}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <Container className={styles.container}>{children}</Container>
    </>
  );
}

export default ListPage;
