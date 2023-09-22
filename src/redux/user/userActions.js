import axios from "axios";
import * as USER_ACIONS from "./userActionTypes";
import {
  BASE_URL,
  getFromLocalForage,
  httpErrorHandler,
  saveToLocalForage,
  toastSuccess,
} from "../../contexts/GlobalContext";
import { toast } from "react-toastify";

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

export const loginUser = (data) => {
  return async function (dispatch) {
    dispatch(loginUserRequest());
    let toastId = toast.loading("Verifying admin...");
    try {
      let response = await axios.post(`${BASE_URL}/auth/login`, data);
      const user = response.data.user;
      const accessToken = response.data.accessToken;
      dispatch(loginUserSuccess(user));
      await saveToLocalForage("accessToken", accessToken);
      toastSuccess(response.data?.message || "Login Successful", toastId, true);
    } catch (error) {
      dispatch(
        loginUserFailure(error?.response?.data?.message || error?.message)
      );
      httpErrorHandler(error, toastId);
    }
  };
};

export const getUser = () => {
  return async function (dispatch) {
    try {
      let accessToken = await getFromLocalForage("accessToken");
      if (!accessToken) return;
      dispatch(loginUserRequest());
      const response = await axios.post(`${BASE_URL}/auth/get-user`, null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const user = response.data.user;
      dispatch(loginUserSuccess(user));
    } catch (error) {
      dispatch(
        loginUserFailure(error?.response?.data?.message || error?.message)
      );
      httpErrorHandler(error);
    }
  };
};
