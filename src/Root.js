import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Button } from "./components/atoms/Button";
import { auth, firestore, storage } from "./firebaseConfig";
import LoggedUser from "./templates/LoggedUser";
import UnloggedUser from "./templates/UnloggedUser";
import { Provider, connect } from "react-redux";
import { store } from "./store";
import { setPostsAction, setUserAction, addImageUrlAction } from "./actions";

const Root = ({ setUser, setPosts, posts, addImageUrl }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.uid);
        const users = firestore
          .collection("users")
          .where("uid", "==", user.uid);
        users.onSnapshot((snapshot) => {
          const user = snapshot.docs.map((doc) => ({ ...doc.data() }));
          console.log(user);
          setUser(user[0]);
        });
        const postsData = firestore.collection("posts").orderBy("date");

        postsData.onSnapshot((snapshot) => {
          const posts = snapshot.docs.map((doc) => ({ ...doc.data() }));
          const tempImagesNames = posts.map((post) => post.imageName);
          const imageNamesSet = new Set(tempImagesNames);
          const imageNames = Array.from(imageNamesSet);
          console.log(imageNames);
          imageNames.map((name) => {
            const pathRef = storage.ref("/photos/" + name);

            pathRef.getDownloadURL().then((url) => {
              console.log(url);
              addImageUrl({ name: name, url: url });
            });
          });

          setPosts(posts.reverse());
        });
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        {currentUser ? <LoggedUser /> : <UnloggedUser />}-
      </BrowserRouter>
    </Provider>
  );
};
const mapStateToProps = (state) => ({
  posts: state.posts,
});
const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUserAction(user)),
  setPosts: (posts) => dispatch(setPostsAction(posts)),
  addImageUrl: (url) => dispatch(addImageUrlAction(url)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Root);
