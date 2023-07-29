"use client";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

const HostButton = () => {
  const userStatus = useAppSelector((state) => state.user);

  return (
    <div>
      {userStatus.loginStatus ? (
        <Link
          href={`/live-stream/${userStatus.uid}/host`}
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
