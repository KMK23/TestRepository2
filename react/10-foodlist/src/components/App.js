import "./App.css";
import logoImg from "../assets/logo.png";
import searChImg from "../assets/ic-search.png";
import FoodForm from "./FoodForm";
import FoodList from "./FoodList";
import footerLogo from "../assets/logo-text.png";
import backgroundImg from "../assets/background.png";
import { useEffect, useState } from "react";
import { deleteDatas, getDatas, getDatasByOrderLimit } from "../api/firebase";

const LIMIT = 5;
let listItems;

function AppSortButton({ children, selected, onClick }) {
  return (
    <button
      className={`AppSortButton ${selected ? "selected" : ""}`}
      onClick={onClick}
      disabled={selected}
    >
      {children}
    </button>
  );
}

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [lq, setLq] = useState();
  // lastQuery를 관리하기위해 만든 state이다.
  const [hasNext, setHasNext] = useState(true);
  // 더보기버튼을 관리 하기 위해 만든 state이다
  const [keyword, setKeyword] = useState("");

  const handleLoad = async (options) => {
    const { resultData, lastQuery } = await getDatasByOrderLimit(
      "foods",
      options
    );
    console.log(lastQuery);

    if (!options.lq) {
      setItems(resultData);
    } else {
      setItems((prev) => [...prev, ...resultData]);
    }

    setLq(lastQuery);
    if (!lastQuery) {
      setHasNext(false);
    }
    // 여기있는 lastQuery는 계속 가지고 있어야해. 그래야 마지막에 화면에 나온게 뭔지 알수 있지
  };

  // const handleLoad = async (options) => {
  //   const { resultData, lastQuery } = await getDatasByOrderLimit(
  //     "foods",
  //     options
  //   );
  //   setItems((prev) => [...prev, ...resultData]);
  //   setLq(lastQuery);
  // };
  // ==========> 이상태로 냅두면 더보기를 누르면 1번부터 계속 다시 나와 그래서 그걸 방지하기 위해서 다른 코드로 로직으로 짜야해

  const handleNewestClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");

  const handleMoreClick = () => {
    handleLoad({ fieldName: order, limits: LIMIT, lq: lq });
    // 그냥 handleLoad 넣어주면 되는데 위에 options 라고 객체 넣어주기로 했으니까 파라미터에 객체방식으로 데이터를 넣어준거야
  };

  const handleKeyWordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems(
      listItems.filter((item) => {
        return item.title.includes(keyword);
      })
    );
  };

  const handleDelete = async (docId, imgUrl) => {
    const result = await deleteDatas("foods", docId, imgUrl);
    if (!result) {
      alert("저장된 이미지 파일이 없습니다. \n관리자에게 문의하세요");
      return false;
    }
    setItems((prev) => prev.filter((item) => item.docId !== docId));
  };

  useEffect(() => {
    handleLoad({ fieldName: order, limits: LIMIT, lq: undefined });
  }, [order]);
  // 여기 fieldName:order, limits : LIMIT는 원래 getDatasByOrderLimit 함수에 파라미터로 들어가있던걸 여기로 옮기고 위에 options 라는 파라미터로 만든거뿐이야

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
          <form className="App-search" onSubmit={handleSubmit}>
            <input
              className="App-search-input"
              onChange={handleKeyWordChange}
            />
            <button className="App-search-button">
              <img src={searChImg} />
            </button>
          </form>
          <div className="App-orders">
            <AppSortButton
              selected={order === "createdAt"}
              onClick={handleNewestClick}
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
        <FoodList items={items} handleDelete={handleDelete} />
        {hasNext && (
          <button onClick={handleMoreClick} className="App-load-more-button">
            더보기
          </button>
        )}
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
