import * as HOLIDAY_ACTIONS from "./holidayActionTypes";

const initialState = { loading: false, holidayData: null, error: "" };

const holidayReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOLIDAY_ACTIONS.SET_HOLIDAY:
      return { ...state, loading: false, holidayData: action.payload };
    case HOLIDAY_ACTIONS.UPDATE_HOLIDAY_REQUEST:
      return { ...state, loading: true, error: "" };
    case HOLIDAY_ACTIONS.UPDATE_HOLIDAY_SUCCESS:
      return { ...state, holidayData: action.payload, loading: false };
    case HOLIDAY_ACTIONS.UPDATE_HOLIDAY_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case HOLIDAY_ACTIONS.GET_HOLIDAY_REQUEST:
      return { ...state, loading: true, error: "" };
    case HOLIDAY_ACTIONS.GET_HOLIDAY_SUCCESS:
      return { ...state, holidayData: action.payload, loading: false };
    case HOLIDAY_ACTIONS.GET_HOLIDAY_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default holidayReducer;
