import React from "react";
import styled from "styled-components";
import Container from "./Container";
import { Link } from "react-router-dom";
import cn from "classnames";

const NavWrapper = styled.div`
  position: relative;
  padding: 15px 0;
  box-shadow: var(--box-shadow);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-family: "PeoplefirstFightingTTF";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/2406-2@1.0/PeoplefirstFightingTTF.woff2")
    format("woff2");
  font-weight: 900;
  font-style: normal;
  font-size: 20px;

  span {
    background-color: #545454;
    color: white;
    padding: 0 3px;
    margin-right: 2px;
  }
`;

const Menu = styled.ul`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
  gap: 30px;

  &.dark a,
  &.dark a:hover,
  &.dark a:active {
    color: red;
  }

  a:hover,
  a:active {
    text-decoration: underline;
  }
`;

function Nav({ className }) {
  return (
    <div className={cn(className)}>
      <Container>
        <Wrapper>
          <Link to="/">
            <Logo>
              <span>DW</span>OS
            </Logo>
          </Link>
          <Menu>
            <li>
              <Link to="About">About</Link>
            </li>
          </Menu>
        </Wrapper>
      </Container>
    </div>
  );
}

export default Nav;
