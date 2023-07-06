import Link from "next/link";
import Nav from "@/components/Nav";
import Rooms from "@/components/live-stream/Rooms";
import HostButton from "@/components/live-stream/HostButton";

const LiveStream = () => {
  return (
    <div>
      <div className="">
        <div className="my-[30px]">
          <p className="my-[10px] text-[24px] mx-auto text-center">
            直播用戶列表
          </p>
          <Rooms />
        </div>
        <HostButton />
      </div>

      <Nav />
    </div>
  );
};

export default LiveStream;
