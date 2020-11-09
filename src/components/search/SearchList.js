import React from "react";
import { useSelector } from "react-redux";

import { StyledSearchList } from "../../styledComponents";
import SearchListItem from "./SearchListItem";

const SearchList = () => {
  const users = useSelector((state) => state.searchActiveUsers);
  return (
    <StyledSearchList>
      {users.map((user, index) =>
        user ? <SearchListItem key={index} user={user} /> : null,
      )}
    </StyledSearchList>
  );
};

export default SearchList;
