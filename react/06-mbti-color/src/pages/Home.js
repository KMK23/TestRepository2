import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import ColorSurvey from "../components/ColorSurvey";
import { useState, useEffect } from "react";
import mock from "../lib/mock.json";
import { getAllDatas } from "../lib/firebase";

function Home(props) {
  const [mbti, setMBTI] = useState([]);

  const handleLoad = async () => {
    //파이어베이스에서 데이터 가져오기
    const resultData = await getAllDatas("mbtiColor", "id");
    //mbti state 에 셋팅
    setMBTI(resultData);
  };

  useEffect(() => {
    handleLoad();
    // setMBTI(mock); getAllDatas 써서 파이어베이스에있는 정보 다 가져왔으니 이제 안써도 됌(mock)필요없음
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
            return <ColorSurvey mk={mk} key={idx} />;
          })}
        </ul>
      </main>
    </div>
  );
}

export default Home;
