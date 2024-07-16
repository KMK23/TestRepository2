import React from "react";
import ListPage from "../components/ListPage";
import styles from "../components/ListPage.module.css";
import catalog from "../assets/catalog.svg";

function CourseListPage(props) {
  return (
    <ListPage
      heading="코스 리스트"
      description="여기서 코스 리스트를 확인하세요"
      className={styles.catalog}
      image={catalog}
    />
  );
}

export default CourseListPage;
