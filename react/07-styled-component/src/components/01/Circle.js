import styled, { keyframes } from "styled-components";
import Box from "./Box";

const CircleAnimation = keyframes`
 0%{
    background-color: tomato;   
 }
 33%{
    background-color: pink;   
 }
 66%{
    background-color: violet;   
 }
 100%{
    background-color: tomato;   
 }
 
`;

const Circle = styled(Box)`
  border-radius: 50%;
  animation: ${CircleAnimation} 3s linear infinite;
`;

export default Circle;
