import React from "react";
import { Link } from "react-router-dom";
import { StyledProfileImage, StyledProfileLink } from "../styledComponents";
import profileIcon from "../assets/user.png";
const ProfileImageLink = ({ name, surname, uid, imageUrl, children }) => {
  return (
    <StyledProfileLink
      to={{ pathname: `users/${name}_${surname}`, state: { uid: uid } }}
    >
      <StyledProfileImage src={imageUrl ? imageUrl : profileIcon} />
      {children ? children : null}
    </StyledProfileLink>
  );
};

export default ProfileImageLink;
