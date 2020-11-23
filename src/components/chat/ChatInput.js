import React from "react";
import {
  StyledCloseIcon,
  StyledField,
  StyledMessageContainer,
  StyledMessageWrapper,
} from "../../styledComponents";
import { Input } from "../atoms/Input";
import ProfileImageLink from "../ProfileImageLink";
import "./ChatInput.css";
import closeIcon from "../../assets/icons/close.png";
const ChatInput = ({ photo, sendMessage, messages, chatUser }) => {
  const { name, surname, uid, chatId, profileImage } = chatUser;
  return (
    <div className="chatInputWrapper">
      <div className="borderWrapper">
        <ProfileImageLink
          imageUrl={profileImage}
          uid={uid}
        >{`${name} ${surname}`}</ProfileImageLink>
        <StyledCloseIcon src={closeIcon} alt="close" size={"medium"} />
      </div>
      <div className="messagesWrapper">
        {messages
          ? messages.reverse().map((message) => (
              <StyledMessageWrapper own={message.to ? true : false}>
                <StyledMessageContainer own={message.to ? true : false}>
                  {message.message}
                </StyledMessageContainer>
              </StyledMessageWrapper>
            ))
          : null}
      </div>
      <form className="textForm" onSubmit={(e) => sendMessage(e, chatId, uid)}>
        <input className="chatTextInput" name="message" />
        <button className="sendButton" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
