import axios from "axios";
import * as ABOUT_ACTIONS from "./aboutPageActionType";
import {
  BASE_URL,
  getFromLocalForage,
  getFromLocalStorage,
} from "../../contexts/GlobalContext";

export const getAboutPage = () => {
  return { type: ABOUT_ACTIONS.GET_ABOUT_PAGE };
};

export const getAboutPageFailure = (error) => {
  return {
    type: ABOUT_ACTIONS.GET_ABOUT_PAGE_FAILURE,
    payload: error,
  };
};

export const getAboutPageSuccess = (pageContent) => {
  return {
    type: ABOUT_ACTIONS.GET_ABOUT_PAGE_SUCCESS,
    payload: pageContent,
  };
};

export const updateAboutPage = () => {
  return { type: ABOUT_ACTIONS.UPDATE_ABOUT_PAGE };
};

export const updateAboutPageFailure = (error) => {
  return {
    type: ABOUT_ACTIONS.UPDATE_ABOUT_PAGE_FAILURE,
    payload: error,
  };
};

export const updateAboutPageSuccess = (pageContent) => {
  return {
    type: ABOUT_ACTIONS.UPDATE_ABOUT_PAGE_SUCCESS,
    payload: pageContent,
  };
};

export const getAboutPageContent = () => {
  return async (dispatch) => {
    try {
      dispatch(getAboutPage());
      const response = await axios.get(`${BASE_URL}/about-page/get-page`);
      dispatch(getAboutPageSuccess(response.data.aboutPage));
    } catch (error) {
      dispatch(
        getAboutPageFailure(
          error?.response?.data?.message ||
            error?.message ||
            error?.request ||
            "An error ocurred"
        )
      );
    }
  };
};

export const savePageContent = (pageId, contents) => {
  return async (dispatch) => {
    try {
      dispatch(updateAboutPage());
      let accessToken = getFromLocalStorage("accessToken");
      if (!accessToken)
        return dispatch(updateAboutPageFailure("Unauthorized user"));
      const response = await axios.patch(
        `${BASE_URL}/about-page/update-page/${pageId}`,
        { contents },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      dispatch(updateAboutPageSuccess(response.data.aboutPage));
    } catch (error) {
      dispatch(
        updateAboutPageFailure(
          error?.response?.data?.message || "An error occured"
        )
      );
    }
  };
};
