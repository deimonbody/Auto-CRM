import { PATHES, ROLE, TRIPSTATUS, UserRole } from "./enum";

export interface IUser {
  firstName: string;
  lastName: string;
  userID: string;
  age: number;
  role: ROLE;
  userRole: UserRole;
}

export interface ITrip {
  tripID: string;
  from: string;
  to: string;
  countOfPassengers: number;
  status: TRIPSTATUS;
}

export interface ITripDB extends ITrip {
  driverID: string;
  managerID: string;
}

export interface ITripResult extends ITrip {
  driver: IUser | null;
  manager: IUser | null;
}

export interface ISideBarItem {
  path: PATHES;
  IconSvg: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
}

export interface ISelectValue<T> {
  label: string;
  value: T;
}
