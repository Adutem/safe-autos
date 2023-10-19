import axios from "axios";
import { BASE_URL, getFromLocalStorage } from "../../contexts/GlobalContext";
import * as REVIEW_ACTIONS from "./reviewActionTypes";
import { httpErrorHandler } from "../../contexts/GlobalContext";

export const setReview = (reviews) => ({
  type: REVIEW_ACTIONS.SET_REVIEW,
  payload: reviews,
});

export const getReviewRequest = () => ({
  type: REVIEW_ACTIONS.GET_REVIEW_REQUEST,
});

export const getReviewSuccess = (reviews) => ({
  type: REVIEW_ACTIONS.GET_REVIEW_SUCCESS,
  payload: reviews,
});

export const getReviewFailture = (error) => ({
  type: REVIEW_ACTIONS.GET_REVIEW_FAILURE,
  payload: error,
});

export const getReview = (shopLocation) => {
  return async (dispatch) => {
    try {
      dispatch(getReviewRequest());
      let response = await axios.get(
        `${BASE_URL}/review?shopLocation=${shopLocation.replace(/\\n/, "")}`
      );
      const reviews = response.data.reviews;
      dispatch(getReviewSuccess(reviews));
    } catch (error) {
      dispatch(
        getReviewFailture(error?.response?.data?.message || error?.message)
      );
      httpErrorHandler(error);
    }
  };
};
