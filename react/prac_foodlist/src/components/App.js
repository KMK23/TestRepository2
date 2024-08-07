import "./App.css";
import logoImg from "../assets/logo.png";
import FoodForm from "./FoodForm";
import searchImg from "../assets/ic-search.png";
import FoodList from "./FoodList";
import footerLogo from "../assets/logo-text.png";
import backgroundImg from "../assets/background.png";
import { useState, useEffect } from "react";
import {
  addDatas,
  deleteDatas,
  getDatasByOrderLimit,
  updateDatas,
} from "../api/firebase";
import LocaleSelect from "./LocaleSelect";
import { useDispatch, useSelector } from "react-redux";

const LIMIT = 5;

function AppSortButton({ children, selected, onClick }) {
  return (
    <button
      className={`AppSortButton ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function App() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.food.items);
  // const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [lq, setLq] = useState();
  const [hasNext, setHasNext] = useState(true);
  const handleLoad = async (options) => {
    // const { resultData, lastQuery } = await getDatasByOrderLimit(
    //   "PracFoods",
    //   options
    // );
    // console.log(resultData);
    // if (!options.lq) {
    // setItems(resultData);
    // } else {
    // setItems((prev) => [...prev, ...resultData]);
    // }
    // setLq(lastQuery);
    // if (!lastQuery) {
    //   setHasNext(false);
    // }
  };

  const handleNewestClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");

  const handleMoreClick = () => {
    handleLoad({ fieldName: order, limits: LIMIT, lq: lq });
  };

  const handleDelete = async (docId, imgUrl) => {
    const result = await deleteDatas("PracFoods", docId, imgUrl);
    if (!result) {
      alert("저장된 아이템이 없습니다. \n관리자에게 문의하세요");
    }
    // setItems((prevItems) =>
    //   prevItems.filter(function (item) {
    //     return item.docId !== docId;
    //   })
    // );
  };

  const handleAddSuccess = (resultData) => {
    // setItems((prevItems) => [resultData, ...prevItems]);
  };

  const handleUpdateSuccess = (result) => {
    // setItems((prev) => {
    //   const splitIndex = prev.findIndex((item) => item.id === result.id);
    //   return [
    //     ...prev.slice(0, splitIndex),
    //     result,
    //     ...prev.slice(splitIndex + 1),
    //   ];
    // });
  };

  useEffect(() => {
    const queryOption = {
      conditions: [],
      orderBys: [{ field: order, direction: "desc" }],
      lastQuery: undefined,
      limits: LIMIT,
    };
    handleLoad();
  }, [order]);
  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="App-nav">
        <img src={logoImg} />
      </div>
      <div className="App-container">
        <div className="App-FoodForm">
          <FoodForm onSubmit={addDatas} onSubmitSuccess={handleAddSuccess} />
        </div>
        <div className="App-filter">
          <form className="App-search">
            <input className="App-search-input" />
            <button className="App-search-button">
              <img src={searchImg} />
            </button>
          </form>
          <div className="App-orders">
            <AppSortButton
              onClick={handleNewestClick}
              selected={order === "createdAt"}
            >
              최신순
            </AppSortButton>
            <AppSortButton
              onClick={handleCalorieClick}
              selected={order === "calorie"}
            >
              칼로리순
            </AppSortButton>
          </div>
        </div>
        <FoodList
          items={items}
          handleDelete={handleDelete}
          onUpdate={updateDatas}
          onUpdateSuccess={handleUpdateSuccess}
        />
        <button className="App-load-more-button" onClick={handleMoreClick}>
          더보기
        </button>
      </div>
      <div className="App-footer">
        <div className="App-footer-container">
          <img src={footerLogo} />
          <LocaleSelect />
          <div className="App-footer-menu">
            서비스 이용약관 | 개인정보 처리방침
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
