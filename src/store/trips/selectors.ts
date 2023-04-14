import { RootState } from "../types";

export const selectTripsLoading = (state: RootState) =>
  state.tripsReducer.isLoading;

export const selectTrips = (state: RootState) => state.tripsReducer.trips;
