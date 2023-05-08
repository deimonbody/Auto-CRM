import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user";
import { usersReducer } from "./users";
import { tripsReducer } from "./trips";

export const reducer = combineReducers({
  userReducer,
  usersReducer,
  tripsReducer,
});
export const store = configureStore({
  reducer,
});
