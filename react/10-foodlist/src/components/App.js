import "./App.css";
import logoImg from "../assets/logo.png";
import AppSortButton from "./AppSortButton";
import FoodForm from "./FoodForm";
import FoodList from "./FoodList";
import footerLogo from "../assets/logo-text.png";
import backgroundImg from "../assets/background.png";
import SearchInput from "./SearchInput";
import { useEffect, useState } from "react";
import { getDatas } from "../api/firebase";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [lq, setLq] = useState();

  const handleLoad = async () => {
    const resultData = await getDatas("foods");
    setItems(resultData);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  console.log(items);
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
          <SearchInput />
          <div className="App-Sorts">
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
            <option>English</option>
          </select>
          <div className="App-footer-menu">
            서비스 이용 약관 | 개인정보 처리방침
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
