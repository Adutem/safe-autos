import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import formEmailReducer from "./formEmail/formEmailReducer";

const rootReducer = combineReducers({
  user: userReducer,
  formEmail: formEmailReducer,
});

export default rootReducer;
