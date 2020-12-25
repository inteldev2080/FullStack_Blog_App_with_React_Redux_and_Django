import { combineReducers } from "redux";
import blogs from "./blogs";
import auth from "./auth";

export default combineReducers({
  blogs,
  auth,
});
