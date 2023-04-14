import { createSlice } from "@reduxjs/toolkit";
import { IState } from "./common";
import { tripsReducer } from "./reducer";

const initialState: IState = {
  isLoading: false,
  trips: null,
};

const { reducer } = createSlice({
  name: "trips",
  initialState,
  reducers: {},
  extraReducers: tripsReducer,
});

export { reducer };
