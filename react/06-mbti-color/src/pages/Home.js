import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import ColorSurvey from "../components/ColorSurvey";
import { useState, useEffect } from "react";
import mock from "../lib/mock.json";

function Home(props) {
  const [mbti, setMBTI] = useState([]);

  useEffect(() => {
    setMBTI(mock);
  }, []);

  console.log(mock);
  //   console.log(styles);
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          <h1 className={styles.heading}>
            MBTI별
            <br />
            <span className={styles.accent}>좋아하는 컬러</span>
          </h1>
          <div>
            <div className={styles.filter}>
              <img className={styles.removeIcon} src="/images/x.svg" />
            </div>
          </div>
        </header>
      </div>
      <main className={styles.content}>
        <Link className={styles.addItem} to="/New">
          +새 컬러 등록하기
        </Link>
        <ul className={styles.items}>
          {mbti.map((mk, idx) => {
            return (
              <li key={idx}>
                <ColorSurvey mk={mk} />
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default Home;
