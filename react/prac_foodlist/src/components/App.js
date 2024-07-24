import "./App.css";
import logoImg from "../assets/logo.png";
import FoodForm from "./FoodForm";
import searchImg from "../assets/ic-search.png";
import FoodList from "./FoodList";
import footerLogo from "../assets/logo-text.png";
import backgroundImg from "../assets/background.png";
import { useState, useEffect } from "react";
import { getDatasByOrderLimit } from "../api/firebase";

const LIMIT = 5;

function AppSortButton({ children }) {
  return <button className="AppSortButton">{children}</button>;
}

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [lq, setLq] = useState();
  const handleLoad = async (options) => {
    const { resultData, lastQuery } = await getDatasByOrderLimit(
      "PracFoods",
      options
    );
    console.log(resultData);
    setItems((prev) => [...prev, ...resultData]);
    setLq(lastQuery);
  };

  useEffect(() => {
    handleLoad({ fieldName: order, limit: LIMIT });
  }, [order]);
  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="App-nav">
        <img src={logoImg} />
      </div>
      <div className="App-container">
        <div className="App-FoodForm">
          <FoodForm />
        </div>
        <div className="App-filter">
          <form className="App-search">
            <input className="App-search-input" />
            <button className="App-search-button">
              <img src={searchImg} />
            </button>
          </form>
          <div className="App-orders">
            <AppSortButton>최신순</AppSortButton>
            <AppSortButton>칼로리순</AppSortButton>
          </div>
        </div>
        <FoodList items={items} />
        <button>더보기</button>
      </div>
      <div className="App-footer">
        <div className="App-footer-container">
          <img src={footerLogo} />
          <select>
            <option>한국어</option>
            <option>ENGLISH</option>
          </select>
          <div className="App-footer-menu">
            서비스 이용약관 | 개인정보 처리방침
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
