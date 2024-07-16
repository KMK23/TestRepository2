import React, { useState } from "react";
import Container from "./Container";
import styles from "./ListPage.module.css";
import cn from "classnames";

function ListPage({ heading, className, description, image }) {
  return (
    <>
      <div className={cn(styles.bg, className)}>
        <img className={styles.icon} src={image} />
        <div className={styles.texts}>
          <h1 className={styles.heading}>{heading}</h1>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <Container className={styles.container}></Container>
    </>
  );
}

export default ListPage;
