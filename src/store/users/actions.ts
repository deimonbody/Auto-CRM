import { createAsyncThunk } from "@reduxjs/toolkit";
import { UsersService } from "@src/services/users.service";
import { IUpdateUserRoleProps, UsersAction } from "./common";

export const setUsers = createAsyncThunk(
  UsersAction.SET_USERS,
  async (userID: string) => {
    const result = await UsersService.getAllUsers(userID);
    return result;
  },
);

export const updateUserRole = createAsyncThunk(
  UsersAction.UPDATE_USER_ROLE,
  async ({ userID, newRole }: IUpdateUserRoleProps) => {
    const newUser = await UsersService.changeUserRole(userID, newRole);
    return newUser;
  },
);
