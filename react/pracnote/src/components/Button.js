import React from "react";

function Button({ children, EnterClick, LeaveClick }) {
  return <button onClick={EnterClick}>{children}</button>;
}

export default Button;
