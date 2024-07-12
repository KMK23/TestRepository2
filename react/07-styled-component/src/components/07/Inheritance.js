import React from "react";
import TernsOfService from "./TernsOfService";
import Button from "./Button";
import styled from "styled-components";

const StyledTernsOfService = styled(TernsOfService)`
  background-color: #ededed;
  width: 400px;
  margin: 40px auto;
  border-radius: 8px;
  padding: 16px;
`;

const SubmitButton = styled(Button)`
  background-color: #de117d;
  margin: 0 auto;
  width: 200px;
  display: block;
  &:hover {
    background-color: #f5070f;
  }
`;

function Inheritance(props) {
  return (
    <div>
      <StyledTernsOfService />
      <SubmitButton>계속하기</SubmitButton>
    </div>
  );
}

export default Inheritance;
