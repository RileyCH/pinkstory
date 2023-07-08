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
          className="bg-gray-200 p-[15px] flex justify-center items-center w-[120px] rounded-lg mx-auto"
        >
          發起直播
        </Link>
      ) : (
        <div className="text-center mt-[250px]">
          <p className="mb-[30px]">您目前尚未登入，需登入才能開啟直播</p>
          <Link
            href="/main"
            className="bg-[#FB6E6E] hover:bg-[#b62c2c] text-white px-[20px] py-[10px] rounded-sm cursor-pointer"
          >
            點此登入
          </Link>
        </div>
      )}
    </div>
  );
};

export default HostButton;
