import Link from "next/link";
import Nav from "@/components/Nav";
import { collection, query, where, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/database";
import Rooms from "@/components/live-stream/Rooms";

interface HostEvent {
  version: string;
  id: string;
  account_id: string;
  app_id: string;
  timestamp: string;
  type: string;
  data: {
    account_id: string;
    app_id: string;
    joined_at: string;
    peer_id: string;
    role: string;
    room_id: string;
    room_name: string;
    session_id: string;
    session_started_at: string;
    template_id: string;
    user_data: string;
    user_id: string;
    user_name: string;
  };
}

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
