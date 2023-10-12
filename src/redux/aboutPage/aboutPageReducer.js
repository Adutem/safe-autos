import * as ABOUT_ACTIONS from "./aboutPageActionType";

const initialState = {
  loading: false,
  pageContent: null,
  error: "",
  updating: false,
  updateError: "",
  updateSuccess: "",
};

const aboutPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ABOUT_ACTIONS.GET_ABOUT_PAGE:
      return { ...state, loading: true, error: "" };
    case ABOUT_ACTIONS.GET_ABOUT_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        pageContent: action.payload,
        error: "",
      };
    case ABOUT_ACTIONS.GET_ABOUT_PAGE_FAILURE:
      return {
        ...state,
        loading: false,
        pageContent: null,
        error: action.payload,
      };
    case ABOUT_ACTIONS.UPDATE_ABOUT_PAGE:
      return { ...state, updating: true, updateError: "", updateSuccess: "" };
    case ABOUT_ACTIONS.UPDATE_ABOUT_PAGE_SUCCESS:
      return {
        ...state,
        updating: false,
        pageContent: action.payload,
        updateError: "",
        updateSuccess: "Updated successfully",
      };
    case ABOUT_ACTIONS.UPDATE_ABOUT_PAGE_FAILURE:
      return {
        ...state,
        updating: false,
        pageContent: null,
        updateError: action.payload,
        updateSuccess: "",
      };
    default:
      return state;
  }
};

export default aboutPageReducer;
