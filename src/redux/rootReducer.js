import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import formEmailReducer from "./formEmail/formEmailReducer";
import holidayReducer from "./holiday/holidayReducer";

const rootReducer = combineReducers({
  user: userReducer,
  formEmail: formEmailReducer,
  holiday: holidayReducer,
});

export default rootReducer;
