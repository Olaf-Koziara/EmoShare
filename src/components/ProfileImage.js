import React from "react";
import { Link } from "react-router-dom";
import { StyledProfileImage } from "../styledComponents";

const ProfileImage = ({ name, surname, email, imageUrl }) => {
  return (
    <Link
      to={{ pathname: `users/${name}_${surname}`, state: { email: email } }}
    >
      <StyledProfileImage src={imageUrl} />
    </Link>
  );
};

export default ProfileImage;
