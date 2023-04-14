import { ITrip } from "@src/common/interface";

export interface IState {
  isLoading: boolean;
  trips: null | ITrip[];
}

export enum TripsActions {
  SET_TRIPS = "SET_TRIPS",
  ADD_NEW_TRIP = "ADD_NEW_TRIP",
}
