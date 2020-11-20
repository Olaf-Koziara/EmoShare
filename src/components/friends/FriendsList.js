import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../../firebaseConfig";
import { StyledPostsList } from "../../styledComponents";
import FriendsListItem from "./FriendsListItem";

const FriendsList = ({ friends }) => {
  return (
    <StyledPostsList>
      {friends
        ? friends.map((friend) => <FriendsListItem friend={friend} />)
        : null}
    </StyledPostsList>
  );
};

export default FriendsList;
