import React from "react";
import { Link } from "react-router-dom";
import {
  StyledCommentContentWrapper,
  StyledCommentListItem,
} from "../../styledComponents";
import ProfileImageLink from "../ProfileImageLink";

const CommentListItem = ({ comment }) => {
  const { name, surname, content, image, uid } = comment;
  return (
    <StyledCommentListItem className="d-flex">
      <ProfileImageLink imageUrl={image} uid={uid} />
      <div>
        <Link
          to={{ pathname: `users/${name}_${surname}`, state: { uid: uid } }}
        >
          {`${name} ${surname}`}
        </Link>

        <StyledCommentContentWrapper>{content}</StyledCommentContentWrapper>
      </div>
    </StyledCommentListItem>
  );
};

export default CommentListItem;
