import { PATHES, ROLE, UserRole } from "./enum";

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
}

export interface ISideBarItem {
  path: PATHES;
  IconSvg: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
}
