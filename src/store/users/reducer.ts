import { ActionReducerMapBuilder, isAnyOf } from "@reduxjs/toolkit";
import { IUser } from "@src/common/interface";
import { IState } from "./common";
import { setUsers, updateUserRole } from "./actions";

export const usersReducer = (builder: ActionReducerMapBuilder<IState>) => {
  builder
    .addCase(setUsers.fulfilled, (state, actions) => {
      state.users = actions.payload;
    })
    .addCase(updateUserRole.fulfilled, (state, actions) => {
      const newUser = actions.payload;

      const newUsers = state.users?.map((el) => {
        if (el.userID === newUser?.userID) return newUser;
        return el;
      }) as IUser[];

      state.users = newUsers;
    })
    .addMatcher(
      isAnyOf(
        setUsers.fulfilled,
        setUsers.rejected,
        updateUserRole.fulfilled,
        updateUserRole.rejected,
      ),
      (state) => {
        state.isLoading = false;
      },
    )
    .addMatcher(isAnyOf(setUsers.pending, updateUserRole.pending), (state) => {
      state.isLoading = true;
    });
};
