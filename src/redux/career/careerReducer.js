import * as CAREER_ACTIONS from "./careerActionTypes";

const initialCareerState = { loading: false, careers: [], error: "" };

const careerReducer = (state = initialCareerState, action) => {
  switch (action.type) {
    case CAREER_ACTIONS.SET_CAREER:
      return { ...state, loading: false, careers: action.payload };
    case CAREER_ACTIONS.GET_CAREER_REQUEST:
      return { ...state, loading: true, error: "" };
    case CAREER_ACTIONS.GET_CAREER_SUCCESS:
      return { ...state, careers: action.payload, loading: false };
    case CAREER_ACTIONS.GET_CAREER_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default careerReducer;
