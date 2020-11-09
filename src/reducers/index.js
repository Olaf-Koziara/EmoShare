import { actionTypes } from "../actions/actionTypes";
import { firestore, storage } from "../firebaseConfig";
import userImage from "../assets/user.png";
const initialState = {
  user: {},
  userImage: userImage,
  posts: [],
  profileImagesUrl: [],
  searchActiveUsers: [],
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
      break;
    }
    case actionTypes.setActiveUsers: {
      return {
        ...state,
        searchActiveUsers: payload,
      };
    }
    default:
      return state;
  }
};

export default emoShareReducer;
