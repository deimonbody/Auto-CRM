import { ROLE } from "@src/common/enum";
import { IUser } from "@src/common/interface";

export interface IState {
  isLoading: boolean;
  users: null | IUser[];
}

export enum UsersAction {
  SET_USERS = "SET_USERS",
  UPDATE_USER_ROLE = "UPDATE_USER_ROLE",
}

export interface IUpdateUserRoleProps {
  userID: string;
  newRole: ROLE;
}
