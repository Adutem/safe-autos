import axios from "axios";
import {
  BASE_URL,
  getFromLocalStorage,
  toastInfo,
} from "../../contexts/GlobalContext";
import * as NEWS_ACTIONS from "./newsActionTypes";
import { httpErrorHandler } from "../../contexts/GlobalContext";
import uploadFile from "../../helpers/fileUpload";

export const setNews = (news) => ({
  type: NEWS_ACTIONS.SET_NEWS,
  payload: news,
});

export const getNewsRequest = () => ({
  type: NEWS_ACTIONS.GET_NEWS_REQUEST,
});

export const getNewsSuccess = (news) => ({
  type: NEWS_ACTIONS.GET_NEWS_SUCCESS,
  payload: news,
});

export const getNewsFailture = (error) => ({
  type: NEWS_ACTIONS.GET_NEWS_FAILURE,
  payload: error,
});

export const createNewsRequest = () => ({
  type: NEWS_ACTIONS.ADD_NEWS_REQUEST,
});

export const createNewsSuccess = (news) => ({
  type: NEWS_ACTIONS.ADD_NEWS_SUCCESS,
  payload: news,
});

export const createNewsFailture = (error) => ({
  type: NEWS_ACTIONS.ADD_NEWS_FAILURE,
  payload: error,
});

export const getNews = (shopLocation) => {
  return async (dispatch) => {
    try {
      dispatch(getNewsRequest());
      let response = await axios.get(
        `${BASE_URL}/news?shopLocation=${shopLocation.replace(/\\n/, "")}`
      );
      const news = response.data.news;
      dispatch(getNewsSuccess(news));
    } catch (error) {
      dispatch(
        getNewsFailture(error?.response?.data?.message || error?.message)
      );
      httpErrorHandler(error);
    }
  };
};

export const createNews = (data, cb) => {
  return async (dispatch) => {
    try {
      const accessToken = getFromLocalStorage("accessToken");
      if (!accessToken) return toastInfo("Invalid session! Try login again");
      dispatch(createNewsRequest());
      let reqBody = {
        title: data.title,
        contents: data.contents,
        shopLocation: data.shopLocation,
      };
      let imgUrl = await uploadFile(data.imgUrl);
      reqBody.imgUrl = imgUrl;
      const response = await axios.post(`${BASE_URL}/news`, reqBody, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const news = response.data.news;
      dispatch(createNewsSuccess(news));
      cb && cb();
    } catch (error) {
      dispatch(
        createNewsFailture(error?.response?.data?.message || error?.message)
      );
      httpErrorHandler(error);
    }
  };
};
