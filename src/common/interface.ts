import { ROLE, UserRole } from "./enum";

export interface IUser {
  firstName: string;
  lastName: string;
  userID: string;
  age: number;
  role: ROLE;
  userRole: UserRole;
}
