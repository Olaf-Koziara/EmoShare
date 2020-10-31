import React from "react";
import { StyledPostParagraph, StyledPostWrapper } from "../styledComponents";
import ProfileImage from "./ProfileImage";

const PostListItem = ({ post, own, imageUrl }) => {
  const { name, surname, email, content, date } = post;
  const dateObject = new Date(date);

  return (
    <StyledPostWrapper>
      <ProfileImage
        imageUrl={imageUrl}
        email={email}
        name={name}
        surname={surname}
      />
      <StyledPostParagraph>{`${name} ${surname} ${dateObject.getDate()}-${
        dateObject.getMonth() + 1
      }-${dateObject.getFullYear()}`}</StyledPostParagraph>
      <StyledPostParagraph>{}</StyledPostParagraph>
      <StyledPostParagraph>{content}</StyledPostParagraph>
    </StyledPostWrapper>
  );
};

export default PostListItem;
