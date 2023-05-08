import { IUser } from "@src/common/interface";

export const getTripPersonalSelector = (el: IUser | null) => {
  if (el) {
    return {
      value: el.userID,
      label: `${el.firstName} ${el.lastName}`,
    };
  }
  return {
    value: "",
    label: "No one",
  };
};
