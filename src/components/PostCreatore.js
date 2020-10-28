import React from "react";
import { connect } from "react-redux";
import {
  StyledPostCreatorWrapper,
  StyledProfileImageWrapper,
} from "../styledComponents";
import { Input } from "./atoms/Input";
import ProfileImage from "./ProfileImage";

const PostCreatore = ({ userImage }) => {
  return (
    <StyledPostCreatorWrapper>
      <ProfileImage imageUrl={userImage} />
      <Input type="text" />
    </StyledPostCreatorWrapper>
  );
};
const mapStateToProps = (state) => ({
  userImage: state.userImage,
});
export default connect(mapStateToProps)(PostCreatore);
