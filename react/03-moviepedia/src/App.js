import { useEffect, useState } from "react";
import "./App.css";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import logoImg from "./assets/logo.png";
import mockItems from "./mock.json";
import { getDatas } from "./firebase";

function AppSortButton({ children }) {
  return <button className="AppSortButton selected">{children}</button>;
}
// children 은 텍스트 뿐만 아니라 요소, 다른 컴포넌트도 가능
//ex) AppSortButton 사이에 Review 컴포넌트를 넣어도 되는거야
function App() {
  const [items, setItems] = useState([]);

  const hadleLoad = async () => {
    const resultData = await getDatas("movie");
    console.log(resultData);
    setItems(resultData);
  };
  // 두번째 훅 useEffect [] 안에 아무것도 없다면!!!
  // 화면이 최초 랜더링 될때 한번만 실행된다.
  // 배열안에 state를 써주고 걔가 변경되면 한번 더 실행한다
  // 배열안에 items 를 넣었더니 한번 랜더링 되고 위에 App 또 읽다가
  // setItems를 만나니까 그게 items 에 들어가고
  // 그러고 나서 배열에 있는 items 를 만나니까 계속 바뀌는줄 안다

  useEffect(() => {
    hadleLoad();
  }, []);

  return (
    <div className="App">
      <nav className="App-nav">
        <div className="App-nav-container">
          <img className="App-logo" src={logoImg} alt="사진" />
          <select>
            <option>한국어</option>
            <option>English</option>
          </select>
        </div>
      </nav>
      <div className="App-container">
        <div className="App-ReviewForm">
          <ReviewForm />
        </div>
        <div className="App-sorts">
          <AppSortButton>최신순</AppSortButton>
          <AppSortButton>베스트순</AppSortButton>
        </div>
        <div className="App-ReviewList">
          <ReviewList items={items} />
          <button className="App-load-more-button">더 눌러봐유</button>
        </div>
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">| 개인정보 처리방침</div>
      </footer>
    </div>
  );
}

export default App;
