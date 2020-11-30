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
export const deletePostAction = (docId)=>({
  type:actionTypes.deletePost,
  payload:docId,
})
export const addImageUrlAction = (url) => ({
  type: actionTypes.addImageUrl,
  payload: url,
});
export const setActiveUsersAction = (value) => {
  return { type: actionTypes.setActiveUsers, payload: value };
};
export const setEmojisAction = (emojis) => ({
  type: actionTypes.setEmojis,
  payload: emojis,
});
export const setChatUsersAction = (users) => ({
  type: actionTypes.setCHatUsers,
  payload: users,
});
export const selectChatAction = (index) => ({
  type: actionTypes.selectChat,
  payload: index,
});
export const closeChatAction = (index) => ({
  type: actionTypes.closeChat,
  payload: index,
});
export const setFriendsAction = (friends) => ({
  type: actionTypes.setFriends,
  payload: friends,
});
