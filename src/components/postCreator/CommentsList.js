import React from "react";
import { idText } from "typescript";
import CommentListItem from "./CommentListItem";

const CommentsList = ({ comments }) => {
  return (
    <ul>
      {comments
        ? comments.map((comment, index) => (
            <CommentListItem key={index} comment={comment} />
          ))
        : null}
    </ul>
  );
};

export default CommentsList;
