import React from "react";
import "./ChatInput.css";
const ChatInput = ({ sendMessage, uid, messages }) => {
  return (
    <div className="chatInputWrapper">
      <div className="messagesWrapper"></div>
      <form onSubmit={(e) => sendMessage(e, uid)}>
        <input name="message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatInput;
