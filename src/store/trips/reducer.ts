import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit";
import { IState } from "./common";
import {
  addNewTrip,
  setTrips,
  updateTripDriver,
  updateTripManager,
  updateTripStatus,
} from "./actions";

export const tripsReducer = (builder: ActionReducerMapBuilder<IState>) => {
  builder
    .addCase(setTrips.fulfilled, (state, actions) => {
      state.trips = actions.payload;
    })
    .addCase(addNewTrip.fulfilled, (state, actions) => {
      state.trips = actions.payload;
    })
    .addCase(updateTripDriver.fulfilled, (state, actions) => {
      state.trips = actions.payload;
    })
    .addCase(updateTripManager.fulfilled, (state, actions) => {
      state.trips = actions.payload;
    })
    .addCase(updateTripStatus.fulfilled, (state, actions) => {
      state.trips = actions.payload;
    })
    .addMatcher(
      isAnyOf(
        setTrips.fulfilled,
        setTrips.rejected,
        addNewTrip.fulfilled,
        addNewTrip.rejected,
        updateTripStatus.fulfilled,
        updateTripStatus.rejected,
        updateTripDriver.fulfilled,
        updateTripDriver.rejected,
        updateTripManager.fulfilled,
        updateTripManager.rejected,
      ),
      (state) => {
        state.isLoading = false;
      },
    )
    .addMatcher(
      isAnyOf(
        setTrips.pending,
        addNewTrip.pending,
        updateTripStatus.pending,
        updateTripDriver.pending,
        updateTripManager.pending,
      ),
      (state) => {
        state.isLoading = true;
      },
    );
};
