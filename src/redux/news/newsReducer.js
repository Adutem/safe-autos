import * as NEWS_ACTIONS from "./newsActionTypes";

const initialNewsState = {
  loading: false,
  news: [],
  error: "",
  creating: false,
  createError: "",
};

const newsReducer = (state = initialNewsState, action) => {
  switch (action.type) {
    case NEWS_ACTIONS.SET_NEWS:
      return { ...state, loading: false, news: action.payload };
    case NEWS_ACTIONS.GET_NEWS_REQUEST:
      return { ...state, loading: true, error: "" };
    case NEWS_ACTIONS.GET_NEWS_SUCCESS:
      return { ...state, news: action.payload, loading: false };
    case NEWS_ACTIONS.GET_NEWS_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case NEWS_ACTIONS.ADD_NEWS_REQUEST:
      return { ...state, creating: true, createError: "" };
    case NEWS_ACTIONS.ADD_NEWS_SUCCESS:
      return {
        ...state,
        news: [...state.news, action.payload],
        creating: false,
      };
    case NEWS_ACTIONS.ADD_NEWS_FAILURE:
      return { ...state, createError: action.payload, creating: false };
    default:
      return state;
  }
};

export default newsReducer;
