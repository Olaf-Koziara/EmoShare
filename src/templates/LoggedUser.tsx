import { auth } from "../firebaseConfig";
import React, { ReactElement } from "react";
import { Button } from "../components/atoms/Button";

import { Route, Switch } from "react-router-dom";
import Home from "../views/Home.js";
import ProfileView from "../views/ProfileView.js";
import Navbar from "../components/navigation/Navbar.js";
import Friends from "../views/Friends";
import Chat from "../components/chat/Chat";
import ChatSelect from "../components/chat/ChatSelect";

const LoggedUser = () => {
  return <>
  <Navbar/>
  <ChatSelect/>
  <Chat/>
  <Switch>
    <Route exact path="/" component={Home}/>
    
    <Route  path="/users/:name" component={ProfileView}/>
    <Route path="/friends" component={Friends}/>
    
  </Switch>
 
  </>;
};

export default LoggedUser;
