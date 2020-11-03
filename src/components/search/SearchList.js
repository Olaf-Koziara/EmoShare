import React from "react";
import { useSelector } from "react-redux";

import { StyledSearchList } from "../../styledComponents";

const SearchList = () => {
  const users = useSelector((state) => state.searchActiveUsers);
  return (
    <StyledSearchList>
      {users.map((user) => (
        <li>{user.name}</li>
      ))}
    </StyledSearchList>
  );
};

export default SearchList;
