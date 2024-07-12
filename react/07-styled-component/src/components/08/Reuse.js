import React from "react";
import styled, { css } from "styled-components";

const SIZE = {
  large: 24,
  medium: 20,
  small: 16,
};

const fontSize = css`
  font-size: ${({ size }) => SIZE[size] ?? SIZE["medium"]}px;
`;

const Button = styled.button`
  background-color: #6750a4;
  border: none;
  color: white;
  padding: 16px;
  /* font-size: ${({ size }) => SIZE[size] ?? SIZE["medium"]}px; */
  ${fontSize}
`;

const Input = styled.input`
  border: 2px solid #eeeeee;
  border-radius: 4px;
  outline: none;
  /* outline 은 포커스 됐을때의 색상이라고 생각 */
  padding: 16px;
  /* font-size: ${({ size }) => SIZE[size] ?? SIZE["medium"]}px; */
  ${fontSize}
`;

const Container = styled.div`
  ${Button},${Input} {
    margin: 10px;
  }
`;

function Reuse(props) {
  return (
    <Container>
      <h2>Button</h2>
      <Button size="small">small</Button>
      <Button size="medium">medium</Button>
      <Button size="large">large</Button>
      <h2>Input</h2>
      <Input size="small" />
      <Input size="medium" />
      <Input size="large" />
    </Container>
  );
}

export default Reuse;
