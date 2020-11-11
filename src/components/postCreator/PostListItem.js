import React from "react";
import {
  StyledPostInfoWrapper,
  StyledPostParagraph,
  StyledPostWrapper,
} from "../../styledComponents";
import ProfileImageLink from "../ProfileImageLink";

const PostListItem = ({ post, own, imageUrl }) => {
  const { name, surname, email, content, date, profileImage } = post;
  const dateObject = new Date(date);

  return (
    <StyledPostWrapper>
      <StyledPostInfoWrapper>
        <ProfileImageLink
          imageUrl={profileImage}
          email={email}
          name={name}
          surname={surname}
        />
        <div className="space-btwn">
          <StyledPostParagraph>{`${name} ${surname}`}</StyledPostParagraph>
          <StyledPostParagraph>
            {`
            ${dateObject.getDate()}-${
              dateObject.getMonth() + 1
            }-${dateObject.getFullYear()}`}
          </StyledPostParagraph>
        </div>
      </StyledPostInfoWrapper>

      <StyledPostParagraph>{content}</StyledPostParagraph>
    </StyledPostWrapper>
  );
};

export default PostListItem;
