import React, { useState } from "react";
import { connect } from "react-redux";
import {
  StyledNavIcon,
  StyledPostCreatorIcon,
  StyledPostCreatorWrapper,
  StyledProfileImageWrapper,
} from "../styledComponents";
import { Input } from "./atoms/Input";
import ProfileImage from "./ProfileImage";
import shareIcon from "../assets/icons/share.png";
import { firestore } from "../firebaseConfig";

const PostCreatore = ({ userImage, user }) => {
  const addPost = () => {
    console.log({
      content: postContent,
      email: user.email,
      name: user.name,
      surname: user.surname,
    });
    firestore.collection("posts").add({
      content: postContent,
      email: user.email,
      name: user.name,
      surname: user.surname,
      date: new Date().toString(),
    });
  };
  const [postContent, SetPostContent] = useState("");

  return (
    <>
      <StyledPostCreatorWrapper>
        <div>
          <ProfileImage imageUrl={userImage} />
          <Input
            type="text"
            placeholder={`
What are you thinking about, ${user.userName}?`}
            fontSize="20"
            value={postContent}
            onChange={(e) => SetPostContent(e.target.value)}
          />
        </div>
        <button onClick={addPost}>
          <StyledPostCreatorIcon src={shareIcon} />
        </button>
      </StyledPostCreatorWrapper>
    </>
  );
};
const mapStateToProps = (state) => ({
  userImage: state.userImage,
  user: state.user,
});

export default connect(mapStateToProps)(PostCreatore);
