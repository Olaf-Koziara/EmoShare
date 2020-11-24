import { Field, Form } from "formik";
import { Link, NavLink } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import LoginPageBack from "../assets/socialBack.jpg";
const spin = keyframes`
  0% {
   transform:rotate(0deg);
  }
  100% {
    transform:rotate(360deg);
  }
  
`;
//global
export const StyledSpinner = styled.img`
  animation: ${spin} 2s linear infinite;

  width: ${({ size }) =>
    size === "small" ? "32px" : size === "medium" ? "64px" : "128px"};
`;
export const StyledSpinnerWrapper = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;

  top: 50%;
  left: 50%;
`;
export const StyledCloseIcon = styled.img`
  width: ${({ size }) =>
    size === "small" ? "8px" : size === "medium" ? "24px" : "32px"};
  height: ${({ size }) =>
    size === "small" ? "8px" : size === "medium" ? "24px" : "32px"};

  border-radius: 8px;
`;
export const StyledCitiesInputWrapper = styled.div`
  position: relative;
  text-align: center;
`;

export const StyledPlaceInputParagraph = styled.p`
  padding: 2px;
  margin: 3px;
  border: 1px solid rgba(200, 200, 200, 0.6);
  border-radius: 2px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: rgba(230, 230, 230, 0.8);
  }
`;
export const StyledAutocompleteWrapper = styled.div`
  position: absolute;

  background: #fafafa;

  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
  padding: 10px;
  color: #666;
  width: 90%;
`;
export const StyledEmojiSliderWrapper = styled.ul`
  list-style: none;
  display: flex;
  overflow-x: auto;
  margin: 5px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
`;
export const StyledProfileLink = styled(Link)`
  display: flex;
`;
//Login page
export const StyledLoginPageWrapper = styled.div`
  background-position: auto;
  height: 1000px;

  border-radius: 20px;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${LoginPageBack});
    filter: blur(10px);
    z-index: -100;
  }
`;
export const StyledLoginPageLogoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -100;
`;
//Login form
export const StyledForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 5px;
  z-index: 100;
`;
export const StyledField = styled(Field)`
  line-height: 50px;
  background-color: #fafafa;

  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 0 20px;
  font-size: 16px;
  color: #666;
  width: 260px;
  margin-left: auto;
  margin-right: auto;

  transition: all 0.4s ease;
`;
export const StyledLoginFormWrapper = styled.div`
  width: 300px;
  margin: 500px 0px;

  ${({ mxAuto }) =>
    mxAuto &&
    css`
      margin-left: auto;
      margin-right: auto;
    `}
  ${({ myAuto }) =>
    myAuto &&
    css`
      margin-top: auto;
      margin-bottom: auto;
    `}
`;
export const StyledRegisterFormWrapper = styled.div`
  width: 300px;
  margin: 5% 0px;

  ${({ mxAuto }) =>
    mxAuto &&
    css`
      margin-left: auto;
      margin-right: auto;
    `}
  ${({ myAuto }) =>
    myAuto &&
    css`
      margin-top: auto;
      margin-bottom: auto;
    `}
`;
export const StyledBackgroundImage = styled.div`
  background-image: url(${LoginPageBack});
  filter: blur(10px);
  height: 100%;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
export const StyledmxAutoWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`;
//Register form
export const StyledPhotoSelect = styled.div`
  width: 100px;
  height: 25px;

  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 2px 3px 0px rgba(0, 0, 0, 0.4);
  padding: 5px;
  text-align: center;
  font-weight: 500;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.6);
  }
  color: rgba(40, 40, 40, 0.4);
`;
export const StyledCropperWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  z-index: 100;
`;
export const StyledProgressBar = styled.div`
  width: ${({ progress }) => progress};
  height: 10px;
  background-color: green;
`;
export const StyledCroppedImageWrapper = styled.div`
  width: 300px;
  height: 300px;
  z-index: 100;
  position: relative;
`;
export const StyledCroppedImage = styled.img`
  width: 100%;
  height: 100%;
`;
export const StyledImageCropperWrapper = styled.div`
  margin: auto;
`;
export const StyledDateLabel = styled.label`
  text-align: center;
  color: black;
`;
//Navigation
export const StyledNavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  width: 100%;
  background-color: #353d43;
`;
export const StyledNavStartWrapper = styled.div`
  width: 40%;
  padding: 5px;
`;
export const StyledNavMidtWrapper = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;
export const StyledNavEndWrapper = styled.div`
  width: 40%;
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
`;
export const StyledNavIcon = styled.img`
  filter: invert(75%);
  width: 30px;
  margin: auto 0;
  @media (min-width: 900px) {
    width: 45px;
  }
`;
export const StyledProfileImage = styled.img`
  width: ${({ medium, large }) =>
    medium ? "100px" : large ? "200px" : "40px"};
  min-height: ${({ medium, large }) =>
    medium ? "100px" : large ? "200px" : "40px"};

  border: 1px solid rgba(100, 100, 100, 0.8);
`;

export const StyledNavEndButton = styled.button`
  margin-left: auto;
  margin-right: 20px;
`;
export const StyledNavSearchWrapper = styled.div`
  width: 150px;
  position: relative;
`;
export const StyledSearchList = styled.ul`
  position: absolute;
  width: 140px;
  height: 100%;
  background-color: rgba(50, 50, 50, 0.6);
`;

export const StyledSearchListItem = styled.li`
  border: 1px solid #666;
`;
//profile
export const StyledProfileWrapper = styled.div`
  width: 800px;
  height: 900px;
  border: 1px solid rgba(50, 50, 50, 0.6);
  ${({ mxAuto }) =>
    mxAuto &&
    css`
      margin-left: auto;
      margin-right: auto;
    `}
`;
export const StyledProfileImageWrapper = styled.div`
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 130px;
`;
export const StyledProfileTextWrapper = styled.div`
  width: 70%;
  height: 400px;
  margin: auto;
  box-shadow: inset 1px 1px 3px 2px #353d43;
  font-size: 22px;
  padding: 30px;
`;
export const StledProfileTextParagraph = styled.p`
  margin: 10px;
`;
export const StyledProfileNameWrapper = styled.div`
  font-size: 30px;
`;
//home
export const StyledHomeWrapper = styled.div``;
export const StyledPostCreatorWrapper = styled.div`
  background-color: #3e4750;
  border-radius: 5px;
  width: 300px;
  @media (min-width: 900px) {
    width: 400px;
  }
  height: 150px;
  margin: 30px auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 60% 40%;
`;
export const StyledPostCreatorIcon = styled.img`
  width: 48px;
  margin: 10px 20px;
  padding: 10px 0;
`;
export const StyledPostsList = styled.ul`
  width: 40%;
  margin: auto;
  list-style: none;
`;
export const StyledPostWrapper = styled.li`
  background-color: #3e4750;
  margin: 10px;

  padding: 40px;
  border-radius: 4px;
`;
export const StyledPostParagraph = styled.p`
  margin: 10px;
`;
export const StyledPostInfoWrapper = styled.div`
  display: flex;
  border-bottom: 0.5px solid #666;
`;
export const StyledPostImage = styled.img`
  width: 100%;
  height: 100;
`;
export const StyledAddCommentWrapper = styled.div`
  width: 30%;
  filter: invert(70%);
`;
export const StyledCommentContentWrapper = styled.div`
  margin-top: 3px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
`;
export const StyledNavLink = styled(NavLink)`
  margin-top: 8px;
`;
export const StyledCommentListItem = styled.li`
  margin: 5px;
  display: flex;
`;
//Chat
export const StyledChatIcon = styled.img`
  position: fixed;
  bottom: 10%;
  right: 3%;
`;
export const StyledChatSelectList = styled.ul`
  position: fixed;
  width: 10%;
  bottom: 10%;
  right: 1%;
  list-style: none;
  background-color: #21262b;
  border-radius: 8px;
  height: 400px;
`;
export const StyledChatSelectListItem = styled.li`
  padding: 5px;
  margin: 6px 0;
  color: whitesmoke;
  font-size: 18px;
  cursor: pointer;
  transition: 0.1s ease-in-out;
  &:hover {
    background-color: #515457;
  }
  border-radius: 8px;
`;
export const StyledChatsWrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  width: 80%;
  gap: 40px;
`;
export const StyledMessageWrapper = styled.div`
  display: flex;

  ${({ own }) =>
    own &&
    css`
      justify-content: flex-end;
    `}
  margin:3px;
`;
export const StyledMessageContainer = styled.div`
  border-radius: 20px;
  background-color: #757575;
  padding: 8px;
  ${({ own }) =>
    own &&
    css`
      background-color: rgb(177, 177, 177);
      color: black;
    `}
`;
