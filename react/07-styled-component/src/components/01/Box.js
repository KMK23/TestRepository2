import styled from "styled-components";

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    background-color: black;

    &:hover {
      background-color: white;
      transform: scale(5, 5);
      transition: all 2s linear;
    }
  }
  /* &:hover {
    background-color: yellow;
    transform: scale(2, 2);
    transition: all 1s linear;
  } */
  /* span:hover {
    background-color: white;
  } */
`;

export default Box;
