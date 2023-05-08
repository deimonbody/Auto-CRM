import { ROLE } from "@src/common/enum";
import { ISelectValue } from "@src/common/interface";
import { RootState } from "../types";

export const selectUsersLoading = (state: RootState) =>
  state.usersReducer.isLoading;

export const selectUsers = (state: RootState) => state.usersReducer.users;

export const selectDrivers = (state: RootState): ISelectValue<string>[] => {
  const users = state.usersReducer.users?.filter(
    (user) => user.role === ROLE.DRIVER,
  );
  return users!.map((item) => ({
    value: item.userID,
    label: `${item.firstName} ${item.lastName}`,
  }));
};

export const selectManagers = (state: RootState) => {
  const users = state.usersReducer.users?.filter(
    (user) => user.role === ROLE.MANAGER,
  );
  return users!.map((item) => ({
    value: item.userID,
    label: `${item.firstName} ${item.lastName}`,
  }));
};
