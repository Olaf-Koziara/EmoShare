import React from "react";
import { useSelector } from "react-redux";

import { StyledSearchList } from "../../styledComponents";
import SearchListItem from "./SearchListItem";

const SearchList = ({ setVisibility }) => {
  const users = useSelector((state) => state.searchActiveUsers);
  return (
    <StyledSearchList>
      {users.map((user, index) =>
        user ? (
          <SearchListItem
            onClick={() => setVisibility(false)}
            key={index}
            user={user}
          />
        ) : null,
      )}
    </StyledSearchList>
  );
};

export default SearchList;
