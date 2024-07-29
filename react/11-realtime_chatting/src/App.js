import { useEffect, useState } from "react";
import { getUserAuth } from "./api/firebase";
import "./App.css";
import SignIn from "./components/SignIn";
import { onAuthStateChanged } from "firebase/auth";
import ChatRoom from "./components/ChatRoom";

function App() {
  const auth = getUserAuth();
  const user = auth.currentUser;
  console.log(auth);
  const [loginUser, setLoginUser] = useState(user);
  // console.log(user);

  const handleLogOut = () => {
    auth.signOut();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // 관찰자 함수=> auth 객체가 바뀌면 바뀐 auth 객체를 가지고 사용자(user)를 꼐속 꺼낸다.
      setLoginUser(user);
    });
  }, []);
  return (
    <div className="App">
      <header>
        <h4> 🙏 소원을 빌어주세요</h4>
        <button onClick={handleLogOut}>로그아웃</button>
      </header>
      <section>
        {loginUser ? <ChatRoom /> : <SignIn auth={auth} login={setLoginUser} />}
      </section>
    </div>
  );
}

export default App;
