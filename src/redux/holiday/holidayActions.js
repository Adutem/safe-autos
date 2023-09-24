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
