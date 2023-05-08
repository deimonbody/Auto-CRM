import { createAsyncThunk } from "@reduxjs/toolkit";
import { TripService } from "@src/services/trips.service";
import { ITripDB } from "@src/common/interface";
import {
  IUpdateTripDriver,
  IUpdateTripManager,
  IUpdateTripStatus,
  TripsActions,
} from "./common";

export const setTrips = createAsyncThunk(TripsActions.SET_TRIPS, async () => {
  const trips = await TripService.getTrips();
  return trips;
});

export const addNewTrip = createAsyncThunk(
  TripsActions.ADD_NEW_TRIP,
  async (newTrip: ITripDB) => {
    await TripService.addNewTrip(newTrip);
    const newTrips = await TripService.getTrips();
    return newTrips;
  },
);

export const updateTripStatus = createAsyncThunk(
  TripsActions.UPDATE_TRIP_STATUS,
  async ({ tripID, newTripStatus }: IUpdateTripStatus) => {
    await TripService.updateTripStatus(newTripStatus, tripID);
    const newTrips = await TripService.getTrips();
    return newTrips;
  },
);

export const updateTripDriver = createAsyncThunk(
  TripsActions.UPDATE_TRIP_DRIVER,
  async ({ tripID, driverID }: IUpdateTripDriver) => {
    await TripService.updateTripDriver(driverID, tripID);
    const newTrips = await TripService.getTrips();
    return newTrips;
  },
);

export const updateTripManager = createAsyncThunk(
  TripsActions.UPDATE_TRIP_MANAGER,
  async ({ tripID, managerID }: IUpdateTripManager) => {
    await TripService.updateTripManager(managerID, tripID);
    const newTrips = await TripService.getTrips();
    return newTrips;
  },
);
