import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { firestore, storage } from "../firebaseConfig";
import {
  StledProfileTextParagraph,
  StyledNavIcon,
  StyledProfileImage,
  StyledProfileImageWrapper,
  StyledProfileNameWrapper,
  StyledProfileTextWrapper,
  StyledProfileWrapper,
  StyledSpinner,
} from "../styledComponents";
import Spinner from "./atoms/Spinner";
import folowIcon from "../assets/icons/001-follower.png";
import profilePhoto from "../assets/user.png";
import friendIcon from "../assets/icons/007-friends.png";
const Profile = ({
  user,
  followUser,
  userDocumentId,
  userFollows,
  userImage,
  own,
}) => {
  const follow = (uid) => {
    firestore
      .collection("users")
      .doc(userDocumentId)
      .update({ follows: [...userFollows, uid] });
  };

  const birthDate = new Date(user.birthDate);

  return (
    <StyledProfileWrapper mxAuto>
      <StyledProfileImageWrapper>
        <StyledProfileImage
          mxAuto
          src={user.profileImage ? user.profileImage : profilePhoto}
          size={"large"}
        />
        <StyledProfileNameWrapper>
          {user.name} {user.surname}
        </StyledProfileNameWrapper>
        {!own ? (
          !userFollows.includes(user.uid) ? (
            <button onClick={() => follow(user.uid)}>
              <StyledNavIcon src={folowIcon} />
            </button>
          ) : (
            <StyledNavIcon src={friendIcon} />
          )
        ) : null}
      </StyledProfileImageWrapper>
      <StyledProfileTextWrapper>
        {own ? "edit" : null}
        <StledProfileTextParagraph>
          Country:{user.country}{" "}
        </StledProfileTextParagraph>
        <StledProfileTextParagraph>City:{user.city} </StledProfileTextParagraph>
        <StledProfileTextParagraph>
          Birth{" "}
          {`${birthDate.getDate()}-${
            birthDate.getMonth() + 1
          }-${birthDate.getFullYear()}`}
        </StledProfileTextParagraph>
      </StyledProfileTextWrapper>
    </StyledProfileWrapper>
  );
};
const mapStateToProps = (state) => ({
  userDocumentId: state.user.docId,
  userFollows: state.user.follows,
});

export default connect(mapStateToProps)(Profile);
