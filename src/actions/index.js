import { actionTypes } from "./actionTypes";

export const setUserAction = (uid) => ({
  type: actionTypes.setUser,
  payload: uid,
});
