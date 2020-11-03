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
  const [userFollows, setUserFollows] = useState();
  const [imagesNames, setImagesNames] = useState([  ]);

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
          console.log(user);
          setUser(user[0]);

          if (user[0].follows.length > 0) {
            const postsData = firestore
              .collection("posts")
              .where("email", "in", user[0].follows);
            postsData.onSnapshot((snapshot) => {
              const posts = snapshot.docs.map((post) => {
                const imageName = post.data().imageName;
                if (!imagesNames.includes(imageName)) {
                  setImagesNames(imageName);
                  const pathRef = storage.ref("/photos/" + imageName);

                  pathRef.getDownloadURL().then((url) => {
                    console.log(url);
                    addImageUrl({ name: imageName, url: url });
                  });
                }
                return {
                  ...post.data(),
                };
              });
              setPosts(posts);
            });
          }
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
  userFollows: state.user.follows,
});
const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUserAction(user)),
  setPosts: (posts) => dispatch(setPostsAction(posts)),
  addImageUrl: (url) => dispatch(addImageUrlAction(url)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Root);
