import { ITripDB, ITripResult } from "@src/common/interface";
import { db } from "@src/config/firebase.config";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { ROLE, TRIPSTATUS } from "@src/common/enum";
import { UserService } from "./user.service";

export class TripService {
  static async getTrips() {
    try {
      const res = await getDocs(collection(db, "trips"));
      const resultFromDB: ITripDB[] = [];
      let result: ITripResult[] = [];

      res.forEach((item) => {
        resultFromDB.push(item.data() as ITripDB);
      });

      result = await Promise.all(
        resultFromDB.map(async (item) => {
          const {
            tripID,
            from,
            to,
            countOfPassengers,
            driverID,
            managerID,
            status,
          } = item;

          const driverDB = await UserService.getUserDBByID(driverID);
          const managerDB = await UserService.getUserDBByID(managerID);

          const tripResult: ITripResult = {
            tripID,
            from,
            to,
            status,
            countOfPassengers,
            driver: driverDB
              ? driverDB.role === ROLE.DRIVER
                ? driverDB
                : null
              : null,
            manager: managerDB
              ? managerDB.role === ROLE.MANAGER
                ? managerDB
                : null
              : null,
          };
          return tripResult;
        }),
      );

      return result;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async addNewTrip(newTrip: ITripDB) {
    try {
      await addDoc(collection(db, "trips"), newTrip);
      return newTrip;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async getTripDocumentID(tripID: string) {
    try {
      const allTrips = await getDocs(collection(db, "trips"));
      let documentID = "";

      allTrips.forEach((item) => {
        const trip = item.data() as ITripDB;
        if (trip.tripID === tripID) {
          documentID = item.id;
        }
      });

      const tripDoc = doc(db, "trips", documentID);
      return tripDoc;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async updateTripStatus(newStatus: TRIPSTATUS, tripID: string) {
    try {
      const tripDoc = await this.getTripDocumentID(tripID);

      await updateDoc(tripDoc, {
        status: newStatus,
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async updateTripDriver(newDriverID: string | null, tripID: string) {
    try {
      const tripDoc = await this.getTripDocumentID(tripID);

      await updateDoc(tripDoc, {
        driverID: newDriverID,
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async updateTripManager(newManagerID: string | null, tripID: string) {
    try {
      const tripDoc = await this.getTripDocumentID(tripID);

      await updateDoc(tripDoc, {
        managerID: newManagerID,
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
