import { auth } from "../../firebaseConfig";
import { Formik } from "formik";
import React from "react";
import { StyledField, StyledForm,StyledLoginFormWrapper } from "../../styledComponents";
import { Button } from "../atoms/Button";
import { Link } from "react-router-dom";

const LoginForm = () => {
  
  const handleLogin = (e:any)=>{
   
    const userEmail = e.email;
    const userPassword = e.password;
    auth.signInWithEmailAndPassword(userEmail, userPassword)
    .then(() => {console.log(auth.currentUser)})
    .catch((error) => {
      alert(`${error}`);
    });
  
  }
  const initialValues = {email:"",password:""};
  return (
    <StyledLoginFormWrapper  mxAuto >
    <Formik   initialValues={initialValues} onSubmit={(e)=>handleLogin(e)} >
    
      <StyledForm >
        <StyledField placeholder="e-mail" name="email" type="email" />
        <StyledField placeholder="password" name="password" type="password" />
        <Button type="submit">Login</Button>
        <Link to="/register"> <Button >Register</Button></Link>
      </StyledForm>
    </Formik>
    </StyledLoginFormWrapper  >
  );
};

export default LoginForm;
