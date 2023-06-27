import Link from "next/link";
import axios from "axios";
import Nav from "@/components/Nav";
import { headers } from "next/headers";

async function getActiveRooms() {
  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto");
  const host = headersData.get("host");
  const res = await fetch(`${protocol}://${host}/api/live-stream`, {
    next: { revalidate: 0 },
  });
  return res.json();
}

const LiveStream = async () => {
  const { data } = await getActiveRooms();
  return (
    <div>
      <Link href={`/live-stream/6490284b06cb49564217643c/host`}>發起直播</Link>
      {data ? (
        data.map((room: any, index: number) => (
          <Link
            href={`/live-stream/${room.room_id}/guest`}
            key={index}
            className="p-[20px] bg-slate-200"
          >
            {room.room_id}
          </Link>
        ))
      ) : (
        <p>目前尚無用戶直播中</p>
      )}
      <Nav />
    </div>
  );
};

export default LiveStream;
