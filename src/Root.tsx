import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Button } from "./components/atoms/Button";
import { auth, firestore } from "./firebaseConfig";
import LoggedUser from "./templates/LoggedUser";
import UnloggedUser from "./templates/UnloggedUser";
import  {Provider,connect} from "react-redux"
import { store } from "./store";
import{setPostsAction, setUserAction} from "./actions"

type propsType = {setUser:any,setPosts:any}
const Root = ({setUser,setPosts}:propsType) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(()=>{
    auth.onAuthStateChanged((user:any)=>{
    
      if(user){
        setCurrentUser(user.uid)
        const users = firestore.collection("users").where("uid","==",user.uid)
        users.onSnapshot((snapshot)=>{
          const user = snapshot.docs.map((doc)=>({...doc.data()}))
          console.log(user)
            setUser(user[0])
        })
        const postsData= firestore.collection('posts').orderBy("date");
        postsData.onSnapshot((snapshot) => {
          const posts= snapshot.docs.map((doc) => ({ ...doc.data()}));
          setPosts(posts.reverse(
            
          ))
        });
        
                
        
      }else{
        console.log("nopuser")
        setCurrentUser(null)
      }
    })
    
  },[])
  
  return (
    <Provider store={store}>
    <BrowserRouter>
      {currentUser ? <LoggedUser /> : <UnloggedUser />}-
     
    </BrowserRouter>
    </Provider>
  );
};
const mapDispatchToProps = (dispatch:any)=>({
  setUser:(user:any)=>dispatch(setUserAction(user)),
  setPosts:(posts:any)=>dispatch(setPostsAction(posts))
})
export default connect (null,mapDispatchToProps)(Root);
