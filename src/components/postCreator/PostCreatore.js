import React, { useState } from "react";
import { connect } from "react-redux";
import {
  StyledNavIcon,
  StyledPostCreatorIcon,
  StyledPostCreatorWrapper,
  StyledProfileImageWrapper,
} from "../../styledComponents";
import { Input } from "../atoms/Input";
import ProfileImage from "../ProfileImageLink";
import shareIcon from "../../assets/icons/share.png";
import { firestore } from "../../firebaseConfig";
import EmojiSlider from "../EmojiSlider";
import ImageCropper from "../ImageCropper";
import { auth } from "firebase";

const PostCreatore = ({ userImage, user }) => {
  const [imageUrl, setImageUrl] = useState();
  const [emoji, setEmoji] = useState("");
  const addPost = () => {
    firestore
      .collection("posts")
      .add({
        content: postContent,
        comments: [],
        userId: user.uid,
        name: user.name,
        surname: user.surname,
        date: new Date().toString(),
        postImage: imageUrl ? imageUrl : null,
        profileImage: user.profileImage,
        docId: "",
      })
      .then((docRef) =>
        firestore
          .collection("posts")
          .doc(docRef.id)
          .update({ docId: docRef.id })
          .then(() => {
            SetPostContent("");
          }),
      );
  };

  const [postContent, SetPostContent] = useState("");

  return (
    <>
      <StyledPostCreatorWrapper>
        <div>
          <ProfileImage
            surname={user.surname}
            name={user.name}
            uid={user.uid}
            imageUrl={userImage}
          />
          <Input
            type="text"
            placeholder={`
What's in your mind, ${user.name}?`}
            fontSize="20"
            value={postContent}
            onChange={(e) => SetPostContent(e.target.value)}
          />
        </div>

        <button onClick={addPost}>
          <StyledPostCreatorIcon src={shareIcon} />
        </button>
        <EmojiSlider />
        <ImageCropper setUrl={setImageUrl} fullAspect={true} />
      </StyledPostCreatorWrapper>
    </>
  );
};
const mapStateToProps = (state) => ({
  userImage: state.user.profileImage,
  user: state.user,
});

export default connect(mapStateToProps)(PostCreatore);
