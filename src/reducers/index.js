import { actionTypes } from "../actions/actionTypes";
import { firestore } from "../firebaseConfig";
const initialState = {
  user: {},
};
const emoShareReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.setUser: {
      return {
        ...state,
        user: firestore
          .collection("users")
          .where("uid", "==", payload)
          .get()
          .then((doc) => console.log(doc.data)),
      };
    }
    default:
      return state;
  }
};

export default emoShareReducer;
