"use client";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

const HostButton = () => {
  const uid = useAppSelector((state) => state).user.uid;
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
