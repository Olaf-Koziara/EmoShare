import React, { useEffect, useState } from "react";
import {
  StyledAddCommentWrapper,
  StyledCloseIcon,
  StyledNavIcon,
  StyledPostImage,
  StyledPostInfoWrapper,
  StyledPostParagraph,
  StyledPostWrapper,
} from "../../styledComponents";
import { Input } from "../atoms/Input";
import ProfileImageLink from "../ProfileImageLink";
import adddIcon from "../../assets/icons/001-plus.png";
import { firestore } from "../../firebaseConfig";
import CommentsList from "./CommentsList";
import deleteIcon from "../../assets/icons/005-delete.png"
import { useDispatch } from "react-redux";
import { deletePostAction } from "../../actions";
const PostListItem = ({ post, own, imageUrl, addComment }) => {
  const { name, surname, userId, content, date, profileImage,docId } = post;
  const [link, setLink] = useState();
  const [linkPreview, setLinkPreview] = useState();
  const dispatch = useDispatch();
  const dateObject = new Date(date);
  useEffect(() => {
    checkIsLink();
  }, []);
  const checkIsLink = () => {
    const re = /(?![^<]*>|[^<>]*<\/)((https?:)\/\/[a-z0-9&#=.\/\-?_]+)/gi;
    const val = re.exec(content);
    if (val) {
      setLink(val[0]);
      console.log(content.indexOf(val[0]));
      if (val[0].includes("youtube.com")) {
        const id = val[0].substr(val.length - 14, 11);

        setLinkPreview(`https://img.youtube.com/vi/${id}/0.jpg`);
      }
    }
  };
  const deletePost = (docId)=>{
    dispatch(deletePostAction(docId))
  }
  return (
    <StyledPostWrapper>
      <StyledPostInfoWrapper>
        <div className="space-btwn">
          <div>
            <ProfileImageLink
              imageUrl={profileImage}
              uid={userId}
              name={name}
              surname={surname}
            >
              {" "}
              <StyledPostParagraph>{`${name} ${surname}`}</StyledPostParagraph>{" "}
            </ProfileImageLink>
          </div>

          <StyledPostParagraph>
            {`
            ${dateObject.getDate()}-${
              dateObject.getMonth() + 1
            }-${dateObject.getFullYear()}`}
            {own?<button onClick={()=>deletePost(docId)}><StyledCloseIcon src={deleteIcon}/></button>:null}
            
          </StyledPostParagraph>
        </div>
      </StyledPostInfoWrapper>
      <StyledPostParagraph>{content}</StyledPostParagraph>

      {linkPreview || post.postImage ? (
        <a href={link}>
          {" "}
          <StyledPostImage
            src={linkPreview ? linkPreview : post.postImage}
            alt="preview"
          />
        </a>
      ) : null}
      <form onSubmit={(e) => addComment(e, post.docId, post.comments)}>
        <div className="d-flex">
          <Input name="content" placeholder="comment" />

          <StyledAddCommentWrapper>
            <button type="submit">
              <img src={adddIcon} alt="add" />
            </button>
          </StyledAddCommentWrapper>
        </div>
      </form>
      <CommentsList comments={post.comments} />
    </StyledPostWrapper>
  );
};

export default PostListItem;
