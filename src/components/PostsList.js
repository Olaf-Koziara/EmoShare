import React, { useState } from "react";
import { connect } from "react-redux";
import { firestore } from "../firebaseConfig";

const PostsList = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.content}</li>
      ))}
    </ul>
  );
};
const mapStateToProps = (state) => ({
  posts: state.posts,
});
export default connect(mapStateToProps)(PostsList);
