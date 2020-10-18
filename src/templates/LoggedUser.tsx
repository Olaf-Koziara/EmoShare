import { auth } from "../firebaseConfig";
import React, { ReactElement } from "react";
import { Button } from "../components/atoms/Button";
import Navbar from "../components/navigation/Navbar";
import { Route, Switch } from "react-router-dom";
import Home from "../views/Home";

const LoggedUser = () => {
  return <>
  <Navbar/>
  <Switch>
    <Route path="/">
      <Home/>
    </Route>
  </Switch>
  </>;
};

export default LoggedUser;
