import React from "react";

const FriendsListItem = ({ friend }) => {
  const { name } = friend;
  return <div>{name}</div>;
};

export default FriendsListItem;
