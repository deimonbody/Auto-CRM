import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit";
import { IState } from "./common";
import { addNewTrip, setTrips } from "./actions";

export const tripsReducer = (builder: ActionReducerMapBuilder<IState>) => {
  builder
    .addCase(setTrips.fulfilled, (state, actions) => {
      state.trips = actions.payload;
    })
    .addCase(addNewTrip.fulfilled, (state, actions) => {
      state.trips = actions.payload;
    })
    .addMatcher(
      isAnyOf(
        setTrips.fulfilled,
        setTrips.rejected,
        addNewTrip.fulfilled,
        addNewTrip.rejected,
      ),
      (state) => {
        state.isLoading = false;
      },
    )
    .addMatcher(isAnyOf(setTrips.pending, addNewTrip.pending), (state) => {
      state.isLoading = true;
    });
};
