import { firestore } from "../firebaseConfig";
import { actionTypes } from "./actionTypes";

export const setUserAction = (uid) => ({
  type: actionTypes.setUser,
  payload: uid,
});
export const setUserImageAction = (image) => ({
  type: actionTypes.setUserImage,
  payload: image,
});
export const setPostsAction = (posts) => ({
  type: actionTypes.setPosts,
  payload: posts,
});
export const addImageUrlAction = (url) => ({
  type: actionTypes.addImageUrl,
  payload: url,
});
export const setActiveUsersAction = (value) => {
  return { type: actionTypes.setActiveUsers, payload: value };
};
