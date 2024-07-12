import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) => props.bgColor};
  border: none;
  color: white;
  padding: 16px;

  font-size: 18px;
  /* 현재 구조분해 한 상태임 원래는 props 를 이용해서 썼음 */
  /* ??는 앞에가 false 면 뒤에거 한다고.. */
  border-radius: ${({ $round }) => ($round ? "9999px" : "8px")};
  cursor: pointer;
  &:hover {
    background-color: #7760b4;
  }
`;

export default Button;
