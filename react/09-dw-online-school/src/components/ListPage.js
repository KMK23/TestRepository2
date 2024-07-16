import React, { useState } from "react";
import Container from "./Container";
import styles from "./ListPage.module.css";
import catalog from "../assets/catalog.svg";
import cn from "classnames";
function ListPage({}) {
  return (
    <>
      <div className={cn(styles.bg, styles.catalog)}>
        <img className={styles.icon} src={catalog} />
        <div className={styles.texts}>
          <h1 className={styles.heading}>모든코스</h1>
          <p className={styles.description}>
            자체 제작된 코스들로 기초를 쌓으시요
          </p>
        </div>
      </div>
      <Container className={styles.container}></Container>
    </>
  );
}

export default ListPage;
