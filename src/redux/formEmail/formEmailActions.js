import axios from "axios";
import * as FORM_EMAIL_ACTIONS from "./formEmailActionTypes";
import {
  BASE_URL,
  httpErrorHandler,
  getFromLocalStorage,
  toastSuccess,
} from "../../contexts/GlobalContext";
import { toast } from "react-toastify";

export const setFormEmail = (email) => ({
  type: FORM_EMAIL_ACTIONS.SET_FORM_EMAIL,
  payload: email,
});

export const updateFormEmailRequest = () => ({
  type: FORM_EMAIL_ACTIONS.UPDATE_FORM_EMAIL_REQUEST,
});

export const updateFormEmailSuccess = (email) => ({
  type: FORM_EMAIL_ACTIONS.UPDATE_FORM_EMAIL_SUCCESS,
  payload: email,
});

export const updateFormEmailFailure = (error) => ({
  type: FORM_EMAIL_ACTIONS.UPDATE_FORM_EMAIL_FAILURE,
  payload: error,
});

export const updateFormEmail = (data, successCallback, errorCallback) => {
  return async (dispatch) => {
    if (!data) return;
    let accessToken = getFromLocalStorage("accessToken");
    if (!accessToken) return;
    let toastId = toast.loading("Updating...");
    try {
      dispatch(updateFormEmailRequest());

      let response = await axios.post(
        `${BASE_URL}/update-email/${data.emailId}`,
        data,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const formEmail = response.data.formEmail;
      dispatch(updateFormEmailSuccess(formEmail || null));
      toastSuccess(response?.data?.message || "Success...", toastId, true);
      successCallback && successCallback();
    } catch (error) {
      errorCallback && errorCallback();
      dispatch(
        updateFormEmailFailure(error?.response?.data?.message || error?.message)
      );
      httpErrorHandler(error, toastId);
    }
  };
};
