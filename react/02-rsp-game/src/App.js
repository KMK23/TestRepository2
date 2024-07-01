import "./App.css";
import reset from "./assets/ic-reset.svg";
import myImg from "./assets/paper.svg";
import otherImg from "./assets/rock.svg";
function App() {
  return (
    <div className="App">
      <div className="App-titleBox">
        <h1>가위바위보</h1>
        <img src={reset}></img>
      </div>
      <div className="pointBox">
        <div className="myPoint box">
          <h1 className="point">5</h1>
          <p>나</p>
        </div>
        <div className="qt">:</div>
        <div className="otherPoint box">
          <h1 className="point">1</h1>
          <p>상대</p>
        </div>
      </div>
    </div>
  );
}

export default App;
