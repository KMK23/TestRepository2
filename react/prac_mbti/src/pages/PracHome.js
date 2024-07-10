import { Link } from "react-router-dom";
import styles from "./PracHome.module.css";
import { useState, useEffect } from "react";
import mockItem from "../lib/mock.json";
import ColorSurvey from "../components/ColorSurvey";
import { getAllDatas } from "../lib/firebase";

function PracHome(props) {
  const [mbti, setMBTI] = useState([]);

  const handleLoad = async () => {
    const resultData = await getAllDatas("mbtiColor", "id");

    setMBTI(resultData);
  };

  useEffect(() => {
    handleLoad();
  }, []);

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
          {mbti.map((item, idx) => {
            return <ColorSurvey item={item} key={idx} />;
          })}
        </ul>
      </main>
    </div>
  );
}

export default PracHome;
