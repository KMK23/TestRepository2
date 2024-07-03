import "./App.css";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import logoImg from "./assets/logo.png";
// import ticketImg from "./assets/ticket.png";

function AppSortButton({ children }) {
  return <button className="AppSortButton selected">{children}</button>;
}
// children 은 텍스트 뿐만 아니라 요소, 다른 컴포넌트도 가능
//ex) 앱솔트버튼 사이에 리뷰폼컴포넌트를 넣어도 되는거야
function App() {
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
          <ReviewList />
        </div>
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">| 개인정보 처리방침</div>
      </footer>
    </div>
  );
}

export default App;
