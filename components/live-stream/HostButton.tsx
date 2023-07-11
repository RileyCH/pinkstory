"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { loginUser } from "@/redux/features/signup/loginSlice";

const HostButton = () => {
  const uid = useAppSelector((state) => state.user.uid);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkUid = localStorage.getItem("uid");
    if (checkUid) {
      dispatch(loginUser({ uid: checkUid, email: "", password: "" }));
    }
  }, [dispatch]);

  return (
    <div>
      {uid ? (
        <Link
          href={`/live-stream/${uid}/host`}
          className="w-[60px] h-[60px] text-[14px] bg-themePink-400 text-white flex justify-center items-center rounded-full fixed right-6 bottom-[70px] z-20 hover:bg-themePink-500 drop-shadow-lg xl:right-[60px] md:w-[80px] md:h-[80px]"
        >
          開啟
          <br />
          直播
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default HostButton;
