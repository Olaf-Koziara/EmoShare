import React, { useState } from "react";
import { StyledNavIcon, StyledNavSearchWrapper } from "../../styledComponents";
import { Input } from "../atoms/Input";
import searchIcon from "../../assets/icons/001-search.png";
import { setActiveUsersAction } from "../../actions";
import { connect } from "react-redux";
import { firestore } from "../../firebaseConfig";
import withVisiblity from "../../hoc/withVisiblity";
import SearchList from "./SearchList";
const Search = ({ setActiveUsers, activeUseres, isVisible, setVisibility }) => {
  const [users, setUsers] = useState([]);
  const searchUsers = (e) => {
    const value = e.target.value;
    console.log(value);
    if (value.length === 0) {
      setVisibility(false);
    } else {
      setVisibility(true);
    }

    firestore
      .collection("users")
      .get()
      .then((querySnapshot) => {
        let usersTemp = [];
        querySnapshot.forEach((doc) => {
          const userNames = `${doc.data().name} ${doc.data().surname}`;

          if (userNames.includes(value) && value !== "") {
            usersTemp = [...usersTemp, doc.data()];
          }
        });
        setActiveUsers(usersTemp);
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
});
const mapDispatchToProps = (dispatch) => ({
  setActiveUsers: (value) => dispatch(setActiveUsersAction(value)),
});
export default withVisiblity(
  connect(mapStateToProps, mapDispatchToProps)(Search),
);
