import React from "react";
import { FcGoogle } from "react-icons/fc";

function SignIn(props) {
  return (
    <>
      <button>
        <FcGoogle />
        <span>
          <b>구글로 로그인하기</b>
        </span>
      </button>
    </>
  );
}

export default SignIn;
