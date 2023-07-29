"use client";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  uid: string;
  loginStatus: boolean;
};

const initialState: InitialState = {
  uid: "",
  loginStatus: false,
};

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    checkUser: (state, action) => {
      state.uid = action.payload.uid;
      state.loginStatus = action.payload.loginStatus;
    },
  },
});

export default loginSlice.reducer;
export const { checkUser } = loginSlice.actions;
