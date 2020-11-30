import { actionTypes } from "../actions/actionTypes";
import { firestore, storage } from "../firebaseConfig";
import userImage from "../assets/user.png";

const initialState = {
  user: {},
  userImage: userImage,
  posts: [],
  profileImagesUrl: [],
  searchActiveUsers: [],
  chatUsers: [],
  selectedChats: [],
  friends: [],
};
const emoShareReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.setUser: {
      return {
        ...state,
        user: payload,
      };
    }
    case actionTypes.setUserImage: {
      return {
        ...state,
        userImage: payload,
      };
    }
    case actionTypes.setPosts: {
      return {
        ...state,
        posts: payload,
      };
    }
    case actionTypes.addImageUrl: {
      return {
        ...state,
        profileImagesUrl: [...state.profileImagesUrl, payload],
      };
    }
    case actionTypes.setFriends: {
      return {
        ...state,
        friends: payload,
        chatUsers: payload.filter((user) => user.chatId !== null),
      };
    }
    case actionTypes.setActiveUsers: {
      return {
        ...state,
        searchActiveUsers: payload,
      };
    }
    case actionTypes.setEmojis: {
      return {
        ...state,
        emojis: payload,
      };
    }
    case actionTypes.setCHatUsers: {
      return {
        ...state,
        chatUsers: payload,
      };
    }
    case actionTypes.selectChat: {
      return {
        ...state,
        selectedChats: [...state.selectedChats, payload],
      };
    }
    case actionTypes.closeChat: {
      return {
        ...state,
        selectedChats: state.selectedChats.filter((index) => index !== payload),
      };
    }
    case actionTypes.deletePost:{
      firestore.collection("posts").doc(payload).delete()
      return{
      ...state,
      posts:state.posts.filter(post=> post.docId !== payload)
    }}

    default:
      return state;
  }
};

export default emoShareReducer;
