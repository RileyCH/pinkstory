import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "@/redux/features/loginSlice";
import userDataReducer from "./features/userDataSlice";

export const store = configureStore({
  reducer: {
    user: loginReducer,
    fetchUser: userDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
