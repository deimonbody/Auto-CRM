import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit";
import { IState } from "./common";
import { logoutUser, registerUser, setUser } from "./actions";

export const userReducer = (builder: ActionReducerMapBuilder<IState>) => {
  builder
    .addCase(setUser.fulfilled, (state, actions) => {
      state.user = actions.payload;
    })
    .addCase(registerUser.fulfilled, (state, actions) => {
      state.user = actions.payload;
    })
    .addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
    })
    .addMatcher(
      isAnyOf(
        setUser.fulfilled,
        setUser.rejected,
        registerUser.fulfilled,
        registerUser.rejected,
        logoutUser.fulfilled,
        logoutUser.rejected,
      ),
      (state) => {
        state.isLoading = false;
      },
    )
    .addMatcher(
      isAnyOf(setUser.pending, registerUser.pending, logoutUser.pending),
      (state) => {
        state.isLoading = true;
      },
    );
};
