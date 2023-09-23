import * as USER_ACTIONS from "./userActionTypes";

const initialUserState = { loading: true, userData: null, error: "" };

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case USER_ACTIONS.LOGIN_USER_REQUEST:
      return { ...state, loading: true, error: "" };
    case USER_ACTIONS.LOGIN_USER_SUCCESS:
      return { ...state, loading: false, userData: action.payload };
    case USER_ACTIONS.LOGIN_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
