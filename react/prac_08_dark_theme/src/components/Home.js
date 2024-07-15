import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function Home(props) {
  return (
    <Nav>
      <div>
        <Outlet />
      </div>
    </Nav>
  );
}

export default Home;
