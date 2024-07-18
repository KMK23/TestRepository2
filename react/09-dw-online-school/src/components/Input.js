import styled from "styled-components";

const SIZE = {
  large: 24,
  medium: 20,
  small: 16,
};

const Input = styled.input`
  border: none;
  border-bottom: 2px solid #eeeeee;

  outline: none;
  /* outline 은 포커스 됐을때의 색상이라고 생각 */
  padding: 12px 12px;
  width: 100%;
  font-size: ${({ size }) => SIZE[size] ?? SIZE["medium"]}px;
  display: block;
  border-radius: 10px;
  &:focus {
    border-color: ${({ $error }) => ($error ? "#f44336" : "#7760b4")};
  }
  border-radius: ${({ $round }) => ($round ? "999px" : "")};
  &::placeholder {
    font-size: 16px;
    color: lightgray;
  }
`;

export default Input;
