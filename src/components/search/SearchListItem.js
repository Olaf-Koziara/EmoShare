import React from "react";
import { Link } from "react-router-dom";
import { StyledSearchListItem } from "../../styledComponents";
import ProfileImageLink from "../ProfileImageLink";

const SearchListItem = ({ user }) => {
  const { profileImage, uid, name, surname } = user;
  return (
    <StyledSearchListItem>
      <ProfileImageLink
        imageUrl={profileImage}
        uid={uid}
        name={name}
        surname={surname}
      />
      <p>{`${user.name} ${user.surname}`}</p>
    </StyledSearchListItem>
  );
};

export default SearchListItem;
