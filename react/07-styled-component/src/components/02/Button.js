import React from "react";
import styled from "styled-components";
import img from "./nail.png";

const Icon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;

const StyledButton = styled.button`
  background-color: #6750a4;
  padding: 16px;
  color: white;
  border: none;

  &:hover {
    * {
      opacity: 0.2;
    }
  }
`;

function Nesting({ children }) {
  return (
    <StyledButton>
      <Icon src={img} />
      {children}
    </StyledButton>
  );
}

export default Nesting;
