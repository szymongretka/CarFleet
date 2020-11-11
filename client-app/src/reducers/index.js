import { combineReducers } from "redux";
import { car } from "./car";
import auth from "./auth";
import { admin } from "./admin";
import message from "./message";

export const reducers = combineReducers({
  car,
  admin,
  auth,
  message,
});
