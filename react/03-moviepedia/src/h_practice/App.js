import "./App.css";
import logoImg from "../assets/logo.png";

function App() {
  return (
    <div className="App">
      <div className="App-nav">
        <div className="App-nav-container">
          <img className="App-logo" src={logoImg} />
          <select>
            <option>한국어</option>
            <option>English</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
