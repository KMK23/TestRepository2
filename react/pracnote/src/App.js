import "./App.css";
import Button from "./components/Button";
import PracticeComponent from "./components/PracticeComponent";
import { useRef, useState } from "react";

function App() {
  const input = useRef();
  const [inputValue, setInputValue] = useState("");
  const [click, setClick] = useState("");
  const [validation, setValidation] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    setClick(true);
    setValidation(inputValue === "0000");
  };
  return (
    <div>
      <input
        ref={input}
        onChange={handleChange}
        className={click ? (validation ? "success" : "fail") : ""}
      />
      <Button onClick={handleButtonClick}>검증하기</Button>
    </div>
  );
}

export default App;
