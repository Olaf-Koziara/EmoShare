import React, { useState } from "react";
import { StyledNavIcon, StyledNavSearchWrapper } from "../../styledComponents";
import { Input } from "../atoms/Input";
import searchIcon from "../../assets/icons/001-search.png";
import { addImageUrlAction, setActiveUsersAction } from "../../actions";
import { connect } from "react-redux";
import { firestore, storage } from "../../firebaseConfig";
import withVisiblity from "../../hoc/withVisiblity";
import SearchList from "./SearchList";
import Axios from "axios";
const Search = ({
  setActiveUsers,
  activeUseres,
  isVisible,
  setVisibility,
  addImageUrl,
  imagesUrls,
}) => {
  const [users, setUsers] = useState([]);
  Axios.get(
    "https://emoji-api.com/categories?access_key=79a64a94f2e74f9f30b1c3b06ffbc6c6420c20c2",
    {
      data: { slug: "smileys-emotion" },
    },
  ).then((value) => console.log(value));
  const searchUsers = (e) => {
    const value = e.target.value;
    console.log(value);
    if (value.length === 0) {
      setActiveUsers([]);
      setVisibility(false);
    } else {
      if (activeUseres.length > 0) {
        setVisibility(true);
      }
    }

    firestore
      .collection("users")
      .get()
      .then((querySnapshot) => {
        let usersTemp = [];
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          const userNames = `${user.name} ${user.surname}`;

          if (
            userNames.toLowerCase().includes(value.toLowerCase()) &&
            value.length >= 3
          ) {
            usersTemp = [...usersTemp, user];
          }
        });
        if (usersTemp.length > 0) {
          setActiveUsers(usersTemp);
        }
      });
  };
  return (
    <>
      <StyledNavSearchWrapper>
        <button>
          {" "}
          <StyledNavIcon src={searchIcon} alt="search" />{" "}
        </button>
        <Input onChange={(e) => searchUsers(e)} />
        {isVisible ? <SearchList /> : null}
      </StyledNavSearchWrapper>
    </>
  );
};
const mapStateToProps = (state) => ({
  activeUseres: state.searchActiveUsers,
  imagesUrls: state.profileImagesUrl,
});
const mapDispatchToProps = (dispatch) => ({
  setActiveUsers: (value) => dispatch(setActiveUsersAction(value)),
  addImageUrl: (url) => dispatch(addImageUrlAction(url)),
});
export default withVisiblity(
  connect(mapStateToProps, mapDispatchToProps)(Search),
);
