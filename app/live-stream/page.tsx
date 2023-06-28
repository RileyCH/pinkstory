import Link from "next/link";
import Nav from "@/components/Nav";
import { extractFeedbackData } from "@/app/api/live-stream/streaming-rooms/route";

interface HostEvent {
  version: string;
  id: string;
  account_id: string;
  app_id: string;
  timestamp: string;
  type: "peer.join.success";
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

const LiveStream = async () => {
  const data = extractFeedbackData();
  const { event } = JSON.parse(data.toString());

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
          {event.length > 0 ? (
            event.map((room: HostEvent, index: number) => (
              <Link
                href={`/live-stream/${room.data.room_id}/guest`}
                key={index}
                className="bg-red-200 my-3"
              >
                <p>RoomID {room.data.room_id}</p>
                <p>標題 {JSON.parse(room.data.user_data).knowledge}</p>
                <p>使用者名稱 {room.data.user_name}</p>
                <p>開始時間 {room.data.joined_at}</p>
                <p>地點 {JSON.parse(room.data.user_data).city}</p>
              </Link>
            ))
          ) : (
            <p>目前沒有直播</p>
          )}
        </div>
      </div>

      <Nav />
    </div>
  );
};

export default LiveStream;
