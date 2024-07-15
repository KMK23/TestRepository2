import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import styles from "./Home.module.css";
import ThemeToggleButton from "./ThemeToggleButton";
import { useTheme } from "../context/ThemeContext";
function Home(props) {
  const [themeMode, toggleTheme] = useTheme();

  return (
    <div>
      <Nav className={styles.nav} />
      <div className={styles.body}>
        <Outlet />
      </div>
      {/* 라우팅의 기점이 되는 역할.. 아웃렛을 쓰면 호출되는 컴포넌트를 밑으로 쓰게된다는 뜻.
      ex)
      <Outlet>
      <MainPage>
      이런식으로 그 페이지에 밑으로 들어온다
      그래서 nav 를 만들게 되면 아웃렛 윗쪽에 써야 한다.(바뀌지 않으니까)
      */}
      <ThemeToggleButton mode={themeMode} onClick={toggleTheme} />
    </div>
  );
}

export default Home;
