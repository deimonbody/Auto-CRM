import { createAsyncThunk } from "@reduxjs/toolkit";
import { TripService } from "@src/services/trips.service";
import { ITrip } from "@src/common/interface";
import { TripsActions } from "./common";

export const setTrips = createAsyncThunk(TripsActions.SET_TRIPS, async () => {
  const trips = await TripService.getTrips();
  return trips;
});

export const addNewTrip = createAsyncThunk(
  TripsActions.ADD_NEW_TRIP,
  async (newTrip: ITrip) => {
    await TripService.addNewTrip(newTrip);
    const newTrips = await TripService.getTrips();
    return newTrips;
  },
);
