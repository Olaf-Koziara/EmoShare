import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { firestore } from "../../firebaseConfig";
import { StyledPostsList } from "../../styledComponents";
import PostListItem from "./PostListItem";

const PostsList = ({ posts, user, images }) => {
  const addComment = (e, postDocId, postComments) => {
    e.preventDefault();

    firestore
      .collection("posts")
      .doc(postDocId)
      .update({
        comments: [
          ...postComments,
          {
            name: user.name,
            surname: user.surname,
            uid: user.uid,
            content: e.target.content.value,
            image: user.profileImage,
          },
        ],
      });
    e.target.reset();
  };
  const _postsRender = posts.map((post, index) => {
    return (
      <PostListItem
        key={post.content}
        own={user.email === post.email}
        post={post}
        addComment={addComment}
      />
    );
  });
  return <StyledPostsList>{images ? _postsRender : null}</StyledPostsList>;
};
const mapStateToProps = (state) => ({
  // posts: state.posts,
  user: state.user,
  images: state.profileImagesUrl,
});
export default connect(mapStateToProps)(PostsList);
