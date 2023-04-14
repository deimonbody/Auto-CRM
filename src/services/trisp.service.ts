import { ITrip } from "@src/common/interface";
import { db } from "@src/config/firebase.config";
import { addDoc, collection, getDocs } from "firebase/firestore";

export class TripService {
  static async getTrips() {
    try {
      const res = await getDocs(collection(db, "trips"));
      const result: ITrip[] = [];

      res.forEach((item) => {
        result.push(item.data() as ITrip);
      });

      return result;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async addNewTrip(newTrip: ITrip) {
    try {
      await addDoc(collection(db, "trips"), newTrip);
      return newTrip;
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
