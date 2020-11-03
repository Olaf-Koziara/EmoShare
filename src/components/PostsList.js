import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { firestore } from "../firebaseConfig";
import { StyledPostsList } from "../styledComponents";
import PostListItem from "./PostListItem";

const PostsList = ({ user, images }) => {
  const selectedPosts = useSelector((state) => state.posts);

  const _postsRender = selectedPosts.map((post) => {
    const url = images.find((image) => image.name === post.imageName);
    console.log(url);

    if (url) {
      return (
        <PostListItem
          imageUrl={url.url}
          own={user.email === post.email}
          post={post}
        />
      );
    }
  });
  return <StyledPostsList>{images ? _postsRender : null}</StyledPostsList>;
};
const mapStateToProps = (state) => ({
  // posts: state.posts,
  user: state.user,
  images: state.profileImagesUrl,
});
export default connect(mapStateToProps)(PostsList);
