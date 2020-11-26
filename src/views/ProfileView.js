import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import PostsList from "../components/postCreator/PostsList";
import Profile from "../components/Profile.js";
import { firestore } from "../firebaseConfig";

const ProfileView = ({ location, actualUser }) => {
  const [user, setUser] = useState();
  const [userPosts, setUserPosts] = useState([]);
  const { uid } = location.state;

  useEffect(() => {
    firestore
      .collection("users")
      .where("uid", "==", uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => setUser(doc.data()));
      });
    firestore
      .collection("posts")
      .where("userId", "==", uid)
      .get()
      .then((querySnapshot) =>
        querySnapshot.docs.forEach((doc) => {
          setUserPosts([...userPosts, doc.data()]);
        }),
      );
  }, []);

  return (
    <>
      {user ? (
        <>
          <Profile own={actualUser.uid === uid} user={user} />{" "}
          <PostsList posts={userPosts} />
        </>
      ) : null}{" "}
    </>
  );
};
const mapStateToProps = (state) => ({
  actualUser: state.user,
});

export default connect(mapStateToProps)(ProfileView);
