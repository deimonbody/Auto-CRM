import { RootState } from "../types";

export const selectUserLoading = (state: RootState) =>
  state.userReducer.isLoading;

export const selectUser = (state: RootState) => state.userReducer.user;
