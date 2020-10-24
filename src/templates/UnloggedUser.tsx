import React from "react";
import LoginForm from "../components/forms/LoginForm";
import { StyledLoginPageWrapper,StyledBackgroundImage, StyledLoginPageLogoWrapper } from "../styledComponents";
import loginLogo from "../assets/loginLogo.png";
import { Link, Route, Switch } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm.js";
import { Button } from "../components/atoms/Button";
const UnloggedUser = () => {
  return (
    <>
   
      <StyledLoginPageWrapper>
        <StyledLoginPageLogoWrapper>
          <img src={loginLogo} alt="logo"/>
        </StyledLoginPageLogoWrapper>
        <Switch>
          <Route exact path="/">
        <LoginForm />
        
        </Route>
        <Route path="/register">
          <RegisterForm/>

        </Route>
        </Switch>

      </StyledLoginPageWrapper>
    </>
  );
};

export default UnloggedUser;
