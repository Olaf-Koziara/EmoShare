import React, { useEffect, useReducer, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { selectChatAction } from "../../actions";
import { firestore } from "../../firebaseConfig";
import withVisiblity from "../../hoc/withVisiblity";
import { CSSTransition } from "react-transition-group";
import {
  StyledChatIcon,
  StyledChatSelectList,
  StyledChatSelectListItem,
  StyledCloseIcon,
} from "../../styledComponents";
import chatIcon from "../../assets/icons/001-chat.png";
import Chat from "./Chat";
import exitIcon from "../../assets/icons/close.png";
import "../../animations/index.css";
const ChatSelect = ({ isVisible, setVisibility }) => {
  const chatUsers = useSelector((state) => state.chatUsers);
  const dispatch = useDispatch();

  return (
    <>
      {!isVisible ? (
        <button onClick={() => setVisibility(!isVisible)}>
          <StyledChatIcon src={chatIcon} alt="chats" />{" "}
        </button>
      ) : null}
      <CSSTransition
        appear
        timeout={200}
        unmountOnExit
        classNames="pop"
        in={isVisible}
      >
        <StyledChatSelectList>
          <button onClick={() => setVisibility(!isVisible)}>
            <StyledCloseIcon size={"medium"} src={exitIcon} alt="exit" />
          </button>
          {chatUsers.length > 0 ? (
            chatUsers.map((user, index) => (
              <StyledChatSelectListItem
                onClick={() => dispatch(selectChatAction(index))}
                key={index}
              >
                {user.name + " " + user.surname}
              </StyledChatSelectListItem>
            ))
          ) : (
            <div className="text-center">No active users</div>
          )}
        </StyledChatSelectList>
      </CSSTransition>
    </>
  );
};

export default withVisiblity(ChatSelect);
