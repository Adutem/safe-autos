import * as FORM_EMAIL_ACTIONS from "./formEmailActionTypes";

const initialState = { loading: false, emailData: null, error: "" };

const formEmailReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_EMAIL_ACTIONS.SET_FORM_EMAIL:
      return { ...state, loading: false, emailData: action.payload };
    case FORM_EMAIL_ACTIONS.UPDATE_FORM_EMAIL_REQUEST:
      return { ...state, loading: true, error: "" };
    case FORM_EMAIL_ACTIONS.UPDATE_FORM_EMAIL_SUCCESS:
      return { ...state, emailData: action.payload, loading: false };
    case FORM_EMAIL_ACTIONS.UPDATE_FORM_EMAIL_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default formEmailReducer;
