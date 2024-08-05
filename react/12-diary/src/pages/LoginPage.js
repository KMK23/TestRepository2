import React, { useContext } from "react";
import * as FcIcons from "react-icons/fc";
import "./LoginPage.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

function LoginPage(props) {
  const { auth } = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate("/", { relative: true });
  };

  return (
    <div className="login_box">
      <button className="login_btn" onClick={signInWithGoogle}>
        <FcIcons.FcGoogle />
        <span>Continue with Google</span>
      </button>
    </div>
  );
}

export default LoginPage;
