import { IUser } from "@src/common/interface";

export const getManagerTripName = (manager: IUser | null) => {
  if (manager) {
    return `${manager.firstName} ${manager.lastName}`;
  }
  return "No one";
};
