import { actionTypes } from "../actions/actionTypes";
import { firestore } from "../firebaseConfig";
import userImage from "../assets/user.png";
const initialState = {
  user: {},
  userImage: userImage,
  posts: [],
  profileImagesUrl: [],
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
      console.log(payload);
      return {
        ...state,
        profileImagesUrl: [...state.profileImagesUrl, payload],
      };
    }
    default:
      return state;
  }
};

export default emoShareReducer;
