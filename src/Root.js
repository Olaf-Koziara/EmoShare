import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Button } from "./components/atoms/Button";
import { auth, firestore, storage } from "./firebaseConfig";
import LoggedUser from "./templates/LoggedUser";
import UnloggedUser from "./templates/UnloggedUser";
import { Provider, connect } from "react-redux";
import { store } from "./store";
import {
  setPostsAction,
  setUserAction,
  addImageUrlAction,
  setEmojisAction,
  setChatUsersAction,
} from "./actions";
import Axios from "axios";

const Root = ({
  setUser,
  setPosts,
  posts,
  addImageUrl,
  setEmojis,
  setChatUsers,
}) => {
  const [currentUser, setCurrentUser] = useState(null);

  const compare = (a, b) => {
    if (a < b) return 1;
    if (b < a) return -1;

    return 0;
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.uid);
        const users = firestore
          .collection("users")
          .where("uid", "==", user.uid);

        users.onSnapshot((snapshot) => {
          const user = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setUser(user[0]);

          if (user[0].follows.length >= 0) {
            const postsData = firestore
              .collection("posts")
              .where("userId", "in", [...user[0].follows, user[0].uid]);
            postsData.onSnapshot((snapshot) => {
              const posts = snapshot.docs.map((post) => post.data());
              if (posts.length > 0) {
                setPosts(
                  posts.sort((a, b) =>
                    compare(new Date(a.date), new Date(b.date)),
                  ),
                );
              } else {
                setPosts(null);
              }
            });
          }
        });

    //     Axios.get(
    //       "https://emoji-api.com/categories/smileys-emotion?access_key=79a64a94f2e74f9f30b1c3b06ffbc6c6420c20c2",
    //     ).then((response) => {
    //       setEmojis(response.data);
    //     });
    //   } else {
    //     setCurrentUser(null);
    //   }
    // });
  }, []);
  useEffect(() => {
    if (currentUser) {
      const activeUsers = firestore
        .collection("users")
        .where("chatId", "!=", null);
      activeUsers.onSnapshot((snapshot) => {
        const activeUsersArray = snapshot.docs
          .map((user) => user.data())
          .filter((user) => user.uid !== currentUser);
        setChatUsers(activeUsersArray);
      });
    }
  }, [currentUser]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        {currentUser ? <LoggedUser /> : <UnloggedUser />}
      </BrowserRouter>
    </Provider>
  );
};
const mapStateToProps = (state) => ({
  posts: state.posts,
  userFollows: state.user.follows,
});
const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUserAction(user)),
  setPosts: (posts) => dispatch(setPostsAction(posts)),
  addImageUrl: (url) => dispatch(addImageUrlAction(url)),
  setEmojis: (emojis) => dispatch(setEmojisAction(emojis)),
  setChatUsers: (users) => dispatch(setChatUsersAction(users)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
