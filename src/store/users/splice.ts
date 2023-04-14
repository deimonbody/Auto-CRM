import { createSlice } from "@reduxjs/toolkit";
import { IState } from "./common";
import { usersReducer } from "./reducer";

const initialState: IState = {
  isLoading: false,
  users: null,
};

const { reducer } = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: usersReducer,
});

export { reducer };
