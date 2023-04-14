import { createSlice } from "@reduxjs/toolkit";
import { IState } from "./common";
import { userReducer } from "./reducer";

const initialState: IState = {
  isLoading: false,
  user: null,
};

const { reducer } = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: userReducer,
});

export { reducer };
