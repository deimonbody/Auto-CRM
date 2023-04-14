import { IUser } from "@src/common/interface";

export interface IState {
  isLoading: boolean;
  user: null | IUser;
}

export enum UserAction {
  SET_USER = "SET_USER",
  REGISTER_USER = "REGISTER_USER",
  LOGOUT_USER = "LOGOUT_USER",
}

export interface IGetUserProps {
  email: string;
  password: string;
}

export interface IRegisterUserProps extends IGetUserProps {
  firstName: string;
  lastName: string;
  age: number;
}
