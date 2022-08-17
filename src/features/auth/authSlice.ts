import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: {} as IUser, accessToken: "" },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    logOut: (state) => {
      state.user = {} as IUser;
      state.accessToken = "";
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
