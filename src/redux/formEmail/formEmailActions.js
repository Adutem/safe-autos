import axios from "axios";
import * as FORM_EMAIL_ACTIONS from "./formEmailActionTypes";
import {
  BASE_URL,
  httpErrorHandler,
  getFromLocalStorage,
} from "../../contexts/GlobalContext";

export const setFormEmail = (email) => ({
  type: FORM_EMAIL_ACTIONS.SET_FORM_EMAIL,
  payload: email,
});

export const updateFormEmailRequest = () => ({
  type: FORM_EMAIL_ACTIONS.UPDATE_FORM_EMAIL_REQUEST,
});

export const updateFormEmailSuccess = (email) => ({
  type: FORM_EMAIL_ACTIONS.UPDATE_FORM_EMAIL_REQUEST,
  payload: email,
});

export const updateFormEmailFailure = (error) => ({
  type: FORM_EMAIL_ACTIONS.UPDATE_FORM_EMAIL_FAILURE,
  payload: error,
});

export const updateFormEmail = (data, successCallback, errorCallback) => {
  return async (dispatch) => {
    try {
      if (!data) return;
      let accessToken = getFromLocalStorage("accessToken");
      if (!accessToken) return;
      dispatch(updateFormEmailRequest());
      let response = await axios.post(`${BASE_URL}/update-email`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const formEmail = response.data.formEmail;
      dispatch(updateFormEmailSuccess(formEmail[0] || null));
      successCallback && successCallback();
    } catch (error) {
      dispatch(
        updateFormEmailFailure(error?.response?.data?.message || error?.message)
      );
      errorCallback && errorCallback();
      httpErrorHandler(error, null, true);
    }
  };
};
