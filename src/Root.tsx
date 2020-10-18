import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Button } from "./components/atoms/Button";
import { auth } from "./firebaseConfig";
import LoggedUser from "./templates/LoggedUser";
import UnloggedUser from "./templates/UnloggedUser";
import  {Provider} from "react-redux"
import { store } from "./store";

const Root = () => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(()=>{
    auth.onAuthStateChanged((user:any)=>{
      console.log(user)
      if(user){
        setCurrentUser(user.uid)
      }else{
        console.log("nopuser")
        setCurrentUser(null)
      }
    })
    
  },[currentUser])
  return (
    <Provider store={store}>
    <BrowserRouter>
      {currentUser ? <LoggedUser /> : <UnloggedUser />}
     
    </BrowserRouter>
    </Provider>
  );
};

export default Root;
