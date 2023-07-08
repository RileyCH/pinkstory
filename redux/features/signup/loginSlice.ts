"use client";
import { useEffect, useState } from "react";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/database";

type InitialState = {
  uid: string | null;
  loginStatus: boolean;
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  uid: "",
  loginStatus: false,
  loading: false,
  error: "",
};

// const initialState: InitialState = {
//   uid: typeof window !== "undefined" ? localStorage.getItem("uid") : "",
//   loginStatus:
//     typeof window !== "undefined" && window.localStorage.getItem("uid")
//       ? true
//       : false,
//   loading: false,
//   error: "",
// };

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (
    payload: { uid: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const userCredential: any = await new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            localStorage.setItem("uid", user.uid);
            resolve(user);
          } else {
            reject(new Error("User not found"));
          }
        });
      });
      return { uid: userCredential.uid };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      (state.uid = action.payload.uid), (state.error = "");
      state.loginStatus = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.uid = "";
      state.error = "Something went wrong";
      state.loginStatus = false;
    });
  },
});

export default loginSlice.reducer;
