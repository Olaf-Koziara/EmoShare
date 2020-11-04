import React from "react";
import { Link } from "react-router-dom";
import { StyledProfileImage } from "../styledComponents";

const ProfileImageLink = ({ name, surname, email, imageUrl, children }) => {
  return (
    <Link
      to={{ pathname: `users/${name}_${surname}`, state: { email: email } }}
    >
      <StyledProfileImage src={imageUrl} />
      {children ? children : null}
    </Link>
  );
};

export default ProfileImageLink;
