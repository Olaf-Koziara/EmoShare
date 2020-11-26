import React from "react";
import { StyledProfileNameWrapper } from "../../styledComponents";
import ProfileImageLink from "../ProfileImageLink";

const FriendsListItem = ({ friend }) => {
  const { name, surname, profileImage, uid } = friend;
  return (
    <div>
      <ProfileImageLink uid={uid} imageUrl={profileImage} size={"medium"}>
        {" "}
        <StyledProfileNameWrapper>
          {name} {surname}
        </StyledProfileNameWrapper>
      </ProfileImageLink>
    </div>
  );
};

export default FriendsListItem;
