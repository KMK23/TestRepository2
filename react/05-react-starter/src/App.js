import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [inputText, setInputText] = useState("뭐라쓰고싶은데?");
  const handleClick = () => {
    setCount(count + 1);
  };

  const text = (e) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    console.log("나는 화면이 최초 랜더링 될 때 실행되는 uef야");
  }, []); // [](디펜던시 리스트) 안에는 react 가 무엇을 지켜볼지 작성해준다.

  useEffect(() => {
    console.log("나는 count랑 inputText가 변경 될 떄 실행되는 uef야");
  }, [count, inputText]);

  return (
    <div>
      <input type="text" placeholder="Search here" onChange={text} />
      <h2>입력한 값:{inputText}</h2>
      <h1>{count}</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default App;
