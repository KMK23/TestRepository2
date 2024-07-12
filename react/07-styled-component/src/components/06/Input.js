import styled from "styled-components";

const SIZE = {
  large: 24,
  medium: 20,
  small: 16,
};

const Input = styled.input`
  border: 2px solid ${({ $error }) => ($error ? "#f44336" : "#eeeeee")};
  border-radius: 4px;
  outline: none;
  /* outline 은 포커스 됐을때의 색상이라고 생각 */
  padding: 16px;
  font-size: ${({ size }) => SIZE[size] ?? SIZE["medium"]}px;
  &:focus {
    border-color: ${({ $error }) => ($error ? "#f44336" : "#7760b4")};
  }
  border-radius: ${({ $round }) => ($round ? "999px" : "")};
`;

export default Input;
