import axios from "axios";
import { BASE_URL, getFromLocalStorage } from "../../contexts/GlobalContext";
import * as CAREER_ACTIONS from "./careerActionTypes";
import { httpErrorHandler } from "../../contexts/GlobalContext";

export const setCareer = (careers) => ({
  type: CAREER_ACTIONS.SET_CAREER,
  payload: careers,
});

export const getCareerRequest = () => ({
  type: CAREER_ACTIONS.GET_CAREER_REQUEST,
});

export const getCareerSuccess = (careers) => ({
  type: CAREER_ACTIONS.GET_CAREER_SUCCESS,
  payload: careers,
});

export const getCareerFailture = (error) => ({
  type: CAREER_ACTIONS.GET_CAREER_FAILURE,
  payload: error,
});

export const getCareer = (shopLocation) => {
  return async (dispatch) => {
    try {
      dispatch(getCareerRequest());
      let response = await axios.get(
        `${BASE_URL}/career?shopLocation=${shopLocation.replace(/\\n/, "")}`
      );
      const careers = response.data.careers;
      dispatch(getCareerSuccess(careers));
    } catch (error) {
      dispatch(
        getCareerFailture(error?.response?.data?.message || error?.message)
      );
      httpErrorHandler(error);
    }
  };
};
