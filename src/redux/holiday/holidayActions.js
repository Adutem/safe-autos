import axios from "axios";
import * as HOLIDAY_ACTIONS from "./holidayActionTypes";
import {
  BASE_URL,
  httpErrorHandler,
  getFromLocalStorage,
  toastSuccess,
} from "../../contexts/GlobalContext";
import { toast } from "react-toastify";

export const setHoliday = (holidayData) => ({
  type: HOLIDAY_ACTIONS.SET_HOLIDAY,
  payload: holidayData,
});

export const updateHolidayRequest = () => ({
  type: HOLIDAY_ACTIONS.UPDATE_HOLIDAY_REQUEST,
});

export const updateHolidaySuccess = (holidayData) => ({
  type: HOLIDAY_ACTIONS.UPDATE_HOLIDAY_SUCCESS,
  payload: holidayData,
});

export const updateHolidayFailure = (error) => ({
  type: HOLIDAY_ACTIONS.UPDATE_HOLIDAY_FAILURE,
  payload: error,
});

export const getHolidayRequest = () => ({
  type: HOLIDAY_ACTIONS.GET_HOLIDAY_REQUEST,
});

export const getHolidaySuccess = (holidayData) => ({
  type: HOLIDAY_ACTIONS.GET_HOLIDAY_SUCCESS,
  payload: holidayData,
});

export const getHolidayFailture = (error) => ({
  type: HOLIDAY_ACTIONS.GET_HOLIDAY_FAILURE,
  payload: error,
});

export const getHoliday = () => {
  return async (dispatch) => {
    try {
      dispatch(getHolidayRequest());
      let response = await axios.get(`${BASE_URL}/get-holiday`);
      const holiday = response.data.holiday;
      dispatch(getHolidaySuccess(holiday));
    } catch (error) {
      dispatch(
        getHolidayFailture(error?.response?.data?.message || error?.message)
      );
      httpErrorHandler(error);
    }
  };
};

export const updateHoliday = (data, successCallback, errorCallback) => {
  return async (dispatch) => {
    if (!data) return;
    let accessToken = getFromLocalStorage("accessToken");
    if (!accessToken) return;
    let toastId = toast.loading("Updating...");
    try {
      dispatch(updateHolidayRequest());

      let response = await axios.post(
        `${BASE_URL}/update-holiday/${data.holidayId}`,
        data,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const holidayData = response.data.holiday;
      dispatch(updateHolidaySuccess(holidayData || null));
      toastSuccess(response?.data?.message || "Success...", toastId, true);
      successCallback && successCallback();
    } catch (error) {
      errorCallback && errorCallback();
      dispatch(
        updateHolidayFailure(error?.response?.data?.message || error?.message)
      );
      httpErrorHandler(error, toastId);
    }
  };
};
