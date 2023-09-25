import axios from "axios";
import * as USER_ACIONS from "./userActionTypes";
import {
  BASE_URL,
  getFromLocalForage,
  httpErrorHandler,
  saveToLocalForage,
  saveToLocalStorage,
  getFromLocalStorage,
  toastSuccess,
} from "../../contexts/GlobalContext";
import { toast } from "react-toastify";
import { setCareer, setHoliday, setFormEmail } from "../index";

export const loginUserRequest = () => ({
  type: USER_ACIONS.LOGIN_USER_REQUEST,
});

export const loginUserSuccess = (user) => ({
  type: USER_ACIONS.LOGIN_USER_SUCCESS,
  payload: user,
});

export const loginUserFailure = (error) => ({
  type: USER_ACIONS.LOGIN_USER_FAILURE,
  payload: error,
});

export const loginUser = (data, callback) => {
  return async function (dispatch) {
    dispatch(loginUserRequest());
    let toastId = toast.loading("Verifying admin...");
    try {
      let response = await axios.post(`${BASE_URL}/auth/login`, data);
      const user = response.data.user;
      const accessToken = response.data.accessToken;
      const formEmail = response.data.formEmail;
      const holiday = response.data.holiday;
      const careers = response.data.careers;
      dispatch(loginUserSuccess(user));
      dispatch(setFormEmail(formEmail || null));
      dispatch(setHoliday(holiday));
      dispatch(setCareer(careers));
      saveToLocalStorage("accessToken", accessToken);
      toastSuccess(response.data?.message || "Login Successful", toastId, true);
      if (callback) callback();
      return;
    } catch (error) {
      dispatch(
        loginUserFailure(error?.response?.data?.message || error?.message)
      );
      httpErrorHandler(error, toastId);
    }
  };
};

export const getUser = (callback) => {
  return async function (dispatch) {
    try {
      let accessToken = getFromLocalStorage("accessToken");
      if (!accessToken) {
        callback && callback();
      }
      dispatch(loginUserRequest());
      const response = await axios.post(`${BASE_URL}/auth/get-user`, null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const user = response.data.user;
      const formEmail = response.data.formEmail;
      const holiday = response.data.holiday;
      const careers = response.data.careers;
      dispatch(loginUserSuccess(user));
      dispatch(setFormEmail(formEmail || null));
      dispatch(setHoliday(holiday));
      dispatch(setCareer(careers));
      if (callback) callback();
    } catch (error) {
      if (callback) callback();
      dispatch(
        loginUserFailure(error?.response?.data?.message || error?.message)
      );
      httpErrorHandler(error);
    }
  };
};
