//
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
/* createGlobalStyle 로 만든거는 Context에서 themePovider로 만들면 따로 prop을 전달하지 않아도 됌*/
    ${reset}
    body{
        background: ${({ theme }) => theme.bgColor};
        color : ${({ theme }) => theme.textColor};
        position : relative;
        display: block;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        font-family: Pretendard, sans-serif;
    }

`;
