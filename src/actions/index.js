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
