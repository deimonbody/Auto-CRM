import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "@src/common/interface";
import { UserService } from "@src/services/user.service";
import { UserAction } from "./common";

export const setUser = createAsyncThunk(
  UserAction.SET_USER,
  async (user: IUser) => {
    return user || Promise.reject("User wasn`t found");
  },
);

export const registerUser = createAsyncThunk(
  UserAction.REGISTER_USER,
  async (user: IUser) => {
    return user;
  },
);

export const logoutUser = createAsyncThunk(UserAction.LOGOUT_USER, async () => {
  await UserService.logoutUser();
});
