import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/atoms/Spinner";

import PostCreatore from "../components/postCreator/PostCreatore";
import PostsList from "../components/postCreator/PostsList";
import { StyledHomeWrapper } from "../styledComponents";

const Home = () => {
  const selectedPosts = useSelector((state) => state.posts);
  return (
    <StyledHomeWrapper>
      <PostCreatore />
      {selectedPosts !== null ? (
        selectedPosts.length >= 1 ? (
          <PostsList posts={selectedPosts} />
        ) : (
          <Spinner />
        )
      ) : (
        <p className="text-center">no posts</p>
      )}
    </StyledHomeWrapper>
  );
};

export default Home;
