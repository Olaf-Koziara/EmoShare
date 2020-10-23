import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Button } from "./components/atoms/Button";
import { auth, firestore } from "./firebaseConfig";
import LoggedUser from "./templates/LoggedUser";
import UnloggedUser from "./templates/UnloggedUser";
import  {Provider,connect} from "react-redux"
import { store } from "./store";
import{setUserAction} from "./actions"

type propsType = {setUser:any}
const Root = ({setUser}:propsType) => {
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(()=>{
    auth.onAuthStateChanged((user:any)=>{
    
      if(user){
        setCurrentUser(user.uid)
        const data = firestore.collection("users").where("uid","==",user.uid)
        data.onSnapshot((snapshot)=>{
          const user = snapshot.docs.map((doc)=>({...doc.data()}))
            setUser(user[0])
        })
                
        
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
const mapDispatchToProps = (dispatch:any)=>({
  setUser:(uid:String)=>dispatch(setUserAction(uid))
})
export default connect (null,mapDispatchToProps)(Root);
