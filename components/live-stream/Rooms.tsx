"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/database";

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

const Rooms = () => {
  const [rooms, setRooms] = useState<HostEvent[]>([]);

  useEffect(() => {
    const q = query(collection(db, "liveStream"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedRooms: HostEvent[] = [];
      querySnapshot.forEach((doc) => {
        updatedRooms.push(doc.data() as HostEvent);
      });

      setRooms(updatedRooms);
    });
  }, []);

  return (
    <div>
      {rooms.length > 0 ? (
        rooms.map((room: HostEvent, index: number) => (
          <Link
            href={`/live-stream/${room.data.room_id}/guest`}
            key={index}
            className="bg-red-200 my-3"
          >
            <p>RoomID {room.data.room_id}</p>
            <p>
              標題
              {room.data?.user_data &&
                JSON.parse(room.data?.user_data)?.knowledge}
            </p>
            <p>使用者名稱 {room.data.user_name}</p>
            <p>開始時間 {room.data.joined_at}</p>
            <p>
              地點
              {room.data?.user_data && JSON.parse(room.data?.user_data)?.city}
            </p>
            <p>點我加入直播間</p>
          </Link>
        ))
      ) : (
        <p>目前沒有直播</p>
      )}
    </div>
  );
};

export default Rooms;
