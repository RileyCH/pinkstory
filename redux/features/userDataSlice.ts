"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserDataType } from "@/utils/type";
import axios from "axios";

const initialState = {
  uid: typeof window !== "undefined" ? localStorage.getItem("uid") : "",
  age: 0,
  bgImg: "",
  birth: {
    date: 0,
    month: 0,
    year: 0,
  },
  constellations: "",
  follower: [],
  following: [],
  followingCategory: {},
  gender: "Female",
  introduction: "",
  keptPost: [],
  liveStream: {
    roomId: "",
    hostRoomCode: "",
    guestRoomCode: "",
  },
  name: "",
  profileImg: "",
  registedDate: 0,
  thumbnailedPost: [],
};

export const fetchData = createAsyncThunk("fetchUserData/fetch", async () => {
  return await axios
    .get("/api/user-data", {
      headers: { Authorization: `Bearer ${initialState.uid}` },
    })
    .then((response) => {
      return response.data;
    });
});

const loginSlice = createSlice({
  name: "fetchUserData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const userData = action.payload;
      if (userData) {
        state.uid = userData.uid;
        state.age = userData.age;
        state.bgImg = userData.bgImg;
        state.birth = userData.birth;
        state.constellations = userData.constellations;
        state.follower = userData.follower;
        state.following = userData.following;
        state.followingCategory = userData.followingCategory;
        state.gender = userData.gender;
        state.introduction = userData.introduction;
        state.keptPost = userData.keptPost;
        state.liveStream = userData.liveStream;
        state.name = userData.name;
        state.profileImg = userData.profileImg;
        state.registedDate = userData.registedDate;
        state.thumbnailedPost = userData.thumbnailedPost;
      }
    });
  },
});

export default loginSlice.reducer;
