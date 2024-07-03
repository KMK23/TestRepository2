import React from "react";
import logoImg from "../assets/logo.png";
import "./App.css";
import ReviewForm from "./ReviewForm";

function AppSortButton({ children }) {
  return <button className="AppSortButton selected">{children}</button>;
}

function App() {
  return (
    <div className="App">
      <nav className="App-nav">
        <div className="App-nav-container">
          <img src={logoImg} alt="" className="logoImg" />
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
        <div className="App-ReviewList"></div>
      </div>
      <footer className="App-footer">
        <div className="App-footer-container">| 개인정보 처리방침</div>
      </footer>
    </div>
  );
}

export default App;
