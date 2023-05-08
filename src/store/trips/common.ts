import { TRIPSTATUS } from "@src/common/enum";
import { ITripResult } from "@src/common/interface";

export interface IState {
  isLoading: boolean;
  trips: null | ITripResult[];
}

export enum TripsActions {
  SET_TRIPS = "SET_TRIPS",
  ADD_NEW_TRIP = "ADD_NEW_TRIP",
  UPDATE_TRIP_STATUS = "UPDATE_TRIP_STATUS",
  UPDATE_TRIP_MANAGER = "UPDATE_TRIP_MANAGER",
  UPDATE_TRIP_DRIVER = "UPDATE_TRIP_DRIVER",
}

export interface IUpdateTripStatus {
  newTripStatus: TRIPSTATUS;
  tripID: string;
}

export interface IUpdateTripManager {
  tripID: string;
  managerID: string;
}

export interface IUpdateTripDriver {
  tripID: string;
  driverID: string;
}
