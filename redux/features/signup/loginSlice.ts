import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../utils/database";

type LoginUser = {
  uid: string;
};

type InitialState = {
  loading: boolean;
  user: LoginUser;
  error: string;
  loginStatus: boolean;
};

const initialState: InitialState = {
  loading: false,
  user: {
    uid: "",
  },
  error: "",
  loginStatus: true, //need to be modified
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
      return { uid: userCredential.user.uid };
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
      state.user = {
        uid: action.payload.uid,
      };
      state.error = "";
      state.loginStatus = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = { uid: "" };
      state.error = "Something went wrong";
      state.loginStatus = false;
    });
  },
});

export default loginSlice.reducer;
