import { RootState } from "../types";

export const selectUsersLoading = (state: RootState) =>
  state.usersReducer.isLoading;

export const selectUsers = (state: RootState) => state.usersReducer.users;
