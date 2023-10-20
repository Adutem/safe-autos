import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import formEmailReducer from "./formEmail/formEmailReducer";
import holidayReducer from "./holiday/holidayReducer";
import careerReducer from "./career/careerReducer";
import aboutPageReducer from "./aboutPage/aboutPageReducer";
import reviewReducer from "./review/reviewReducer";
import newsReducer from "./news/newsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  formEmail: formEmailReducer,
  holiday: holidayReducer,
  career: careerReducer,
  aboutPage: aboutPageReducer,
  review: reviewReducer,
  news: newsReducer,
});

export default rootReducer;
