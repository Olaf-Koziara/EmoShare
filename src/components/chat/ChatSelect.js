import React, { useEffect, useReducer, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { selectChatAction } from "../../actions";
import { firestore } from "../../firebaseConfig";
import withVisiblity from "../../hoc/withVisiblity";
import {
  StyledChatIcon,
  StyledChatSelectList,
  StyledChatSelectListItem,
} from "../../styledComponents";
import chatIcon from "../../assets/icons/001-chat.png";
import Chat from "./Chat";
const ChatSelect = ({ isVisible, setVisibility }) => {
  const chatUsers = useSelector((state) => state.chatUsers);
  const dispatch = useDispatch();

  return (
    <>
      {!isVisible ? (
        <button onClick={() => setVisibility(!isVisible)}>
          <StyledChatIcon src={chatIcon} alt="chats" />{" "}
        </button>
      ) : (
        <StyledChatSelectList>
          {chatUsers.length > 0
            ? chatUsers.map((user, index) => (
                <StyledChatSelectListItem
                  onClick={() => dispatch(selectChatAction(index))}
                  key={index}
                >
                  {user.name + " " + user.surname}
                </StyledChatSelectListItem>
              ))
            : null}
        </StyledChatSelectList>
      )}
    </>
  );
};

export default withVisiblity(ChatSelect);
