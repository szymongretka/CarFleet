import { combineReducers } from "redux";
import { car } from "./car";
import auth from "./auth";
import message from "./message";

export const reducers = combineReducers({
  car,
  auth,
  message,
});
