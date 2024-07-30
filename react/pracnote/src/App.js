import "./App.css";
import Button from "./components/Button";
import PracticeComponent from "./components/PracticeComponent";
import { useState } from "react";

const INITIAL_VALUE = {
  username: "",
  password: "",
};

function App() {
  const [inputValue, setInputValue] = useState(INITIAL_VALUE);

  const { username, password } = inputValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <>
      <div>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          required
        />
        <label>Username:{username}</label>
      </div>
      <div className="user-box">
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <label>Password :{password}</label>
      </div>
    </>
  );
}

export default App;
