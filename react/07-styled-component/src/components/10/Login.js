import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Input from "./Input";
import Button from "./LoginButton";
import kakaoImg from "./kakao.svg";

const Container = styled.div`
  width: 400px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  label {
    font-size: 16px;
    color: lightgray;
  }
  ${Button} {
    width: 100%;
  }
`;

const LoginHeader = styled(Login)`
  color: blue;
`;

const Header = styled.h1`
  background-image: linear-gradient(140deg, aqua, purple);
  background-clip: text;
  color: transparent;
  font-size: 40px;
`;

const LinkTag = styled(Link)`
  font-weight: 700;
`;
const Box = styled.div`
  width: 100%;
`;
const KakaoBtn = styled(Button)`
  background-image: url(${kakaoImg});
  background-position: 100px 50%;
  background-size: 32px;
  background-repeat: no-repeat;
  color: black;
`;

function Login({ className }) {
  return (
    <Container>
      <Header>DW 온라인 스쿨</Header>
      <p>
        회원이 아니신가요?
        <LinkTag>회원가입 하기</LinkTag>
      </p>
      <Box>
        <label htmlFor="email">이메일</label>
        <br></br>
        <Input placeholder="styled@DW.kr" id="email" type="email"></Input>
        <br></br>
        <label htmlFor="pass">이메일</label>

        <br></br>
        <Input placeholder="비밀번호" id="pass" type="password"></Input>
      </Box>
      <Button bgColor="#6750a4">로그인 하러가기</Button>
      <KakaoBtn bgColor="yellow">카카오 로그인</KakaoBtn>
    </Container>
  );
}
export default Login;
