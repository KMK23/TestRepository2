import styled from "styled-components";

const SIZE = {
  large: 24,
  medium: 20,
  small: 16,
};

const Button = styled.button`
  background-color: #6750a4;
  border: none;
  color: white;
  padding: 16px;
  font-size: ${({ size }) => SIZE[size] ?? SIZE["medium"]}px;
  /* 현재 구조분해 한 상태임 원래는 props 를 이용해서 썼음 */
  /* ??는 앞에가 false 면 뒤에거 한다고.. */
  border-radius: ${({ $round }) => ($round ? "9999px" : "3px")};

  &:hover {
    background-color: #463770;
  }
`;

export default Button;
