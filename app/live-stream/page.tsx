import Link from "next/link";
import axios from "axios";
import Nav from "@/components/Nav";
import { headers } from "next/headers";

// export const revalidate = 10;

async function getActiveRooms() {
  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto");
  const host = headersData.get("host");
  console.log(protocol);

  const res = await fetch(
    `${protocol}://${host}/api/live-stream/streaming-rooms`,
    {
      next: { revalidate: 1 },
    }
  );
  return res.json();
}

const LiveStream = async () => {
  const { data } = await getActiveRooms();
  return (
    <div>
      <Link href="/live-stream/start">發起直播</Link>
      {data ? (
        data.map((room: any, index: number) => (
          <Link href={`/live-stream/${room.room_id}`} key={index}>
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
