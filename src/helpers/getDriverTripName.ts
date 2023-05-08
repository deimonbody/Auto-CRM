import { IUser } from "@src/common/interface";

export const getDriverTripName = (driver: IUser | null) => {
  if (driver) {
    return `${driver.firstName} ${driver.lastName}`;
  }
  return "No one";
};
