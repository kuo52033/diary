import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import status from "./status";

export default combineReducers({
  status,
  posts,
  auth,
});
