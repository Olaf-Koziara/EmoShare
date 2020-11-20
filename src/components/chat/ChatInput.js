import React from "react";

const ChatInput = ({ sendMessage, uid }) => {
  return (
    <form onSubmit={(e) => sendMessage(e, uid)}>
      <input name="message" />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInput;
