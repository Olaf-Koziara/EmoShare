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
import { setUserAction } from "../actions";
const Profile = ({
  user,
  followUser,
  loggedUser,
  userDocumentId,
  userFollows,
  userImage,
  own,
  userId,
  setUser,
}) => {
  const follow = (uid) => {
    const tempUser = loggedUser;
    tempUser.follows = [...tempUser.follows, uid];
    setUser(tempUser);
    firestore
      .collection("users")
      .doc(loggedUser.docId)
      .update({ follows: [...loggedUser.follows, uid] });
    firestore
      .collection("users")
      .doc(user.docId)
      .get()
      .then((doc) => {
        const follows = doc.data().follows;
        firestore
          .collection("users")
          .doc(user.docId)
          .update({ follows: [...follows, loggedUser.uid] });
      });
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
  loggedUser: state.user,
  userDocumentId: state.user.docId,
  userId: state.user.uid,
  userFollows: state.user.follows,
});
const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUserAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
