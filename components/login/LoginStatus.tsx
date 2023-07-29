"use client";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/database";
import { useAppDispatch } from "@/redux/hooks";
import { checkUser } from "@/redux/features/loginSlice";
import { fetchData } from "@/redux/features/userDataSlice";

const LoginStatus = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const checkLoginStatus = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(checkUser({ uid: user.uid, loginStatus: true }));
          dispatch(fetchData({ uid: user.uid }));
        } else {
          dispatch(checkUser({ loginStatus: false }));
        }
      });
    };
    checkLoginStatus();
  }, [dispatch]);

  return <></>;
};

export default LoginStatus;
