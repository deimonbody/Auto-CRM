import { ROLE } from "@src/common/enum";
import { ITripDB, IUser } from "@src/common/interface";
import { db } from "@src/config/firebase.config";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { UserService } from "./user.service";
import { TripService } from "./trips.service";

export class UsersService {
  static async getAllUsers(currentUserID: string) {
    try {
      const res = await getDocs(collection(db, "users"));
      const result: IUser[] = [];

      res.forEach((item) => {
        const user = item.data() as IUser;
        if (user.userID !== currentUserID) {
          result.push(user);
        }
      });
      return result;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async changeUserRole(userID: string, newRole: ROLE) {
    try {
      const allUsers = await getDocs(collection(db, "users"));
      const allTrips = await getDocs(collection(db, "trips"));

      allTrips.forEach((item) => {
        const trip = item.data() as ITripDB;
        if (trip.driverID === userID) {
          TripService.updateTripDriver(null, trip.tripID);
        }
        if (trip.managerID === userID) {
          TripService.updateTripManager(null, trip.tripID);
        }
      });
      let documentID = "";

      allUsers.forEach((item) => {
        const user = item.data() as IUser;
        if (user.userID === userID) {
          documentID = item.id;
        }
      });

      const userDoc = doc(db, "users", documentID);

      await updateDoc(userDoc, {
        role: newRole,
      });

      return await UserService.getUserDBByID(userID);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
