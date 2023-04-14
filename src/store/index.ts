import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user";
import { usersReducer } from "./users";

export const reducer = combineReducers({ userReducer, usersReducer });
export const store = configureStore({
  reducer,
});
