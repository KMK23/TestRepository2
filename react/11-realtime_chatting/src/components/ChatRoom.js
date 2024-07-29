import React from "react";
import * as FaIcons from "react-icons/fa";
function ChatRoom({ onChange, value, onSubmit }) {
  return (
    <>
      <main>
        <div>
          <img />
          <p>{value}</p>
        </div>
      </main>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} name="content" />
        <button type="submit">
          <FaIcons.FaPaperPlane />
        </button>
      </form>
    </>
  );
}

export default ChatRoom;
