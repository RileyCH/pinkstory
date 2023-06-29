import Link from "next/link";
import Nav from "@/components/Nav";
import Rooms from "@/components/live-stream/Rooms";

const LiveStream = () => {
  return (
    <div>
      <div className="">
        <Link
          href={`/live-stream/6490284b06cb49564217643c/host`}
          className="bg-gray-200 p-[15px] flex justify-center items-center w-[120px] rounded-lg"
        >
          發起直播
        </Link>
        <div className="mt-[30px]">
          <p className="mb-[10px]">直播用戶列表</p>
          <Rooms />
        </div>
      </div>

      <Nav />
    </div>
  );
};

export default LiveStream;
