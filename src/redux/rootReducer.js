import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import formEmailReducer from "./formEmail/formEmailReducer";
import holidayReducer from "./holiday/holidayReducer";
import careerReducer from "./career/careerReducer";

const rootReducer = combineReducers({
  user: userReducer,
  formEmail: formEmailReducer,
  holiday: holidayReducer,
  career: careerReducer,
});

export default rootReducer;
