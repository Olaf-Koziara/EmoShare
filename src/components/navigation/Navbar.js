import React, { useEffect, useState } from "react";
import { auth, firestore, storage } from "../../firebaseConfig";
import {
  StyledNavbarWrapper,
  StyledNavEndButton,
  StyledNavEndWrapper,
  StyledNavIcon,
  StyledNavLink,
  StyledNavMidtWrapper,
  StyledNavSearchWrapper,
  StyledNavStartWrapper,
  StyledProfileImageLink,
} from "../../styledComponents";

import homeIcon from "../../assets/icons/003-house-black-silhouette-without-door.png";
import firendsIcon from "../../assets/icons/007-friends.png";

import logoutIcon from "../../assets/icons/009-logout.png";
import { connect, useDispatch } from "react-redux";

import ProfileImage from "../ProfileImageLink";
import { setUserImageAction } from "../../actions";
import Search from "../search/Search";
import { Link } from "react-router-dom";

const Navbar = ({ user, userImage }) => {
  return (
    <StyledNavbarWrapper>
      <StyledNavStartWrapper>
        <Search />
      </StyledNavStartWrapper>
      <StyledNavMidtWrapper>
        <StyledNavLink to="/">
          <StyledNavIcon src={homeIcon} alt="home" />
        </StyledNavLink>
        <StyledNavLink to="/friends">
          <StyledNavIcon src={firendsIcon} alt="friends" />
        </StyledNavLink>
      </StyledNavMidtWrapper>
      {user ? (
        <StyledNavEndWrapper>
          <StyledNavEndButton>
            <ProfileImage
              name={user.name}
              surname={user.surname}
              uid={user.uid}
              imageUrl={userImage}
            />
          </StyledNavEndButton>
          <StyledNavLink to="/">
            <button onClick={() => auth.signOut()}>
              <StyledNavIcon src={logoutIcon} alt="logout" />
            </button>
          </StyledNavLink>
        </StyledNavEndWrapper>
      ) : (
        "null"
      )}
    </StyledNavbarWrapper>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  userImage: state.user.profileImage,
});

export default connect(mapStateToProps)(Navbar);
