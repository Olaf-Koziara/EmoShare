import React, { useState } from "react";
import Profile from "../components/Profile";
import { firestore } from "../firebaseConfig";

const ProfileView = (props) => {
  const [user, setUser] = useState();
  const { email } = props.location.state;
  const data = firestore.collection("users").where("email", "==", email);

  data.onSnapshot((snapshot) => {
    setUser(snapshot.docs[0].data());
  });

  return <>{user ? <Profile user={user} /> : null}</>;
};

export default ProfileView;
