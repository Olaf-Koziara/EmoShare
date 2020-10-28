import { actionTypes } from "../actions/actionTypes";
import { firestore } from "../firebaseConfig";
const initialState = {
  user: {},
  userImage: "",
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
    default:
      return state;
  }
};

export default emoShareReducer;
