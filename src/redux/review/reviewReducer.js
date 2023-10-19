import * as REVIEW_ACTIONS from "./reviewActionTypes";

const initialReviewState = { loading: false, reviews: [], error: "" };

const reviewReducer = (state = initialReviewState, action) => {
  switch (action.type) {
    case REVIEW_ACTIONS.SET_REVIEW:
      return { ...state, loading: false, reviews: action.payload };
    case REVIEW_ACTIONS.GET_REVIEW_REQUEST:
      return { ...state, loading: true, error: "" };
    case REVIEW_ACTIONS.GET_REVIEW_SUCCESS:
      return { ...state, reviews: action.payload, loading: false };
    case REVIEW_ACTIONS.GET_REVIEW_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default reviewReducer;
