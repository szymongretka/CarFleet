import { combineReducers } from "redux";
import { car } from "./car";
import auth from "./auth";
import { admin } from "./admin";
import { reservation } from "./reservation";
import message from "./message";

export const reducers = combineReducers({
  car,
  admin,
  reservation,
  auth,
  message,
});
