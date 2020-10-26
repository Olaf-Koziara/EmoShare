import { auth } from "../firebaseConfig";
import React, { ReactElement } from "react";
import { Button } from "../components/atoms/Button";
import Navbar from "../components/navigation/Navbar";
import { Route, Switch } from "react-router-dom";
import Home from "../views/Home";
import ProfileView from "../views/ProfileView.js";

const LoggedUser = () => {
  return <>
  <Navbar/>
  <Switch>
    <Route exact path="/" component={Home}/>
    
    <Route  path="/:name" component={ProfileView}/>
   
  </Switch>
  </>;
};

export default LoggedUser;
