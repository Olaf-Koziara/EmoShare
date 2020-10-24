import { Field, Form } from "formik";
import styled, { css } from "styled-components";
import LoginPageBack from "../assets/socialBack.jpg";
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
  background: #fafafa;

  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 0 20px;
  font-size: 16px;
  color: #666;

  transition: all 0.4s ease;
`;
export const StyledLoginFormWrapper = styled.div`
  width: 300px;
  margin: 0 0px;

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
  margin: 300px 0px;

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

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
export const StyledmxAutoWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`;
//Register form
export const StyledProgressBar = styled.div`
  height: 10px;
  background-color: red;
  margin: auto;
  width: ${({ progress }) => progress};
`;
//Navigation
export const StyledNavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
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
  width: 45px;
`;
export const StyledProfileImage = styled.img`
  width: ${({ medium, large }) =>
    medium ? "100px" : large ? "200px" : "40px"};

  border-radius: 200px;
  margin-left: auto;
  margin-right: 20px;
`;

export const StyledNavEndButton = styled.button`
  margin-left: auto;
  margin-right: 20px;
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
`;
