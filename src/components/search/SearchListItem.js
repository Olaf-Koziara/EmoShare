import React from "react";
import { Link } from "react-router-dom";
import { StyledSearchListItem } from "../../styledComponents";
import ProfileImageLink from "../ProfileImageLink";

const SearchListItem = ({ user }) => {
  return (
    <StyledSearchListItem>
      <ProfileImageLink></ProfileImageLink>
    </StyledSearchListItem>
  );
};

export default SearchListItem;
