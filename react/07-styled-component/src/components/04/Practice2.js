import React from "react";
import Wrapper from "./Wrapper";
import Email from "./Email";
import Container from "./Container";
import Password from "./Password";

function Practice2(props) {
  return (
    <Container>
      <h1>로그인</h1>
      <label htmlFor="email">Email</label>
      <Email id="email"></Email>
      <label htmlFor="password">Password</label>
      <Password id="password"></Password>
    </Container>
  );
}

export default Practice2;
