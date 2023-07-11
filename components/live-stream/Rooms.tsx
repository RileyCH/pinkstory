"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/database";
import RoomPeers from "./RoomPeers";
import Live from "@/public/background/landing.png";
import profile from "@/public/main/profile.png";
import audience from "@/public/live-stream/audience.png";
import live from "@/public/live-stream/live.png";

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
  const aa = [1, 2, 3, 4, 5, 6, 7, 8];

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
    <div className="w-[100vw] max-w-[1200px] mx-auto flex gap-1 flex-wrap justify-center md:gap-2 xl:gap-3">
      {rooms.length > 0
        ? rooms.map((room: HostEvent) => (
            <Link
              key={room.data.room_id}
              href={`/live-stream/${room.data.room_id}/guest`}
              className="my-1 rounded-lg shadow-lg cursor-pointer"
            >
              <div className="w-[48vw] h-[170px] relative md:w-[200px] md:h-[220px] xl:w-[250px] xl:h-[270px]">
                <Image
                  src={`${JSON.parse(room.data?.user_data)?.cover}`}
                  alt=""
                  fill
                  className="object-cover object-center rounded-t-lg"
                />
                <div className="w-[78px] bg-black bg-opacity-40 px-[7px] py-[2px] flex gap-2 justify-center items-center rounded-full absolute top-3 right-3">
                  <div className="w-[15px] h-[15px] relative">
                    <Image src={live} alt="" fill />
                  </div>
                  <p className="text-white text-[10px]">直播中</p>
                </div>
                <div className="flex gap-2 items-center absolute right-3 bottom-2 bg-black bg-opacity-20 p-2 rounded-lg">
                  <div className="w-[15px] h-[15px] relative">
                    <Image src={audience} alt="" fill />
                  </div>
                  <p className="text-white text-[10px]">
                    <RoomPeers roomId={room.data.room_id} />
                  </p>
                </div>
              </div>

              <div className="max-w-[150px] px-[15px] py-[10px] md:max-w-[200px] xl:max-w-[250px] flex flex-col justify-between">
                <p className="font-medium break-words mb-[5px]">
                  {room.data?.user_data &&
                    JSON.parse(room.data?.user_data)?.theme}
                </p>
                <div className="flex gap-2 items-center">
                  <div className="w-[20px] h-[20px] relative">
                    <Image
                      src={`${
                        room.data?.user_data &&
                        JSON.parse(room.data?.user_data)?.profile
                      }`}
                      alt=""
                      fill
                      className="rounded-full"
                    />
                  </div>
                  <p className="text-[12px] text-darkPink">
                    {room.data.user_name}
                  </p>
                </div>
              </div>
            </Link>
          ))
        : ""}

      <Link
        href={`/live-stream/12345/guest`}
        className="my-1 rounded-lg shadow-lg cursor-pointer relative"
      >
        <div className="w-[48vw] h-[170px] relative md:w-[200px] md:h-[220px] xl:w-[250px] xl:h-[270px]">
          <Image
            src={Live}
            alt=""
            fill
            className="object-cover object-center rounded-t-lg"
          />
          <div className="w-[78px] bg-black bg-opacity-40 px-[7px] py-[2px] flex gap-2 justify-center items-center rounded-full absolute top-3 right-3">
            <div className="w-[15px] h-[15px] relative">
              <Image src={live} alt="" fill />
            </div>
            <p className="text-white text-[10px]">直播中</p>
          </div>
          <div className="flex gap-2 bg-black bg-opacity-20 p-2 rounded-lg items-center absolute right-3 bottom-2">
            <div className="w-[15px] h-[15px] relative">
              <Image src={audience} alt="" fill />
            </div>
            <p className="text-white text-[10px]">1000</p>
          </div>
        </div>

        <div className="max-w-[48vw] px-[15px] py-[10px] md:max-w-[200px] xl:max-w-[250px]">
          <p className="font-medium break-words mb-[5px]">夏日能量 🥹</p>
          <div className="flex gap-2 items-center absolute bottom-3">
            <div className="w-[15px] h-[15px] relative">
              <Image src={profile} alt="" fill />
            </div>
            <p className="text-[12px] text-darkPink">使用者名稱</p>
          </div>
        </div>
      </Link>

      {aa.map((a) => (
        <Link
          key={a}
          href={`/live-stream/12345/guest`}
          className="my-1 rounded-lg shadow-lg cursor-pointer relative"
        >
          <div className="w-[48vw] h-[170px] relative md:w-[200px] md:h-[220px] xl:w-[250px] xl:h-[270px]">
            <Image
              src={Live}
              alt=""
              fill
              className="object-cover object-center rounded-t-lg"
            />
            <div className="w-[78px] bg-black bg-opacity-40 px-[7px] py-[2px] flex gap-2 justify-center items-center rounded-full absolute top-3 right-3">
              <div className="w-[15px] h-[15px] relative">
                <Image src={live} alt="" fill />
              </div>
              <p className="text-white text-[10px]">直播中</p>
            </div>
            <div className="flex gap-2 items-center absolute right-3 bottom-2 bg-black bg-opacity-40 p-2 rounded-lg">
              <div className="w-[15px] h-[15px] relative">
                <Image src={audience} alt="" fill />
              </div>
              <p className="text-white text-[10px]">1000</p>
            </div>
          </div>
          <div className="max-w-[48vw] px-[15px] pt-[10px] pb-[35px] md:max-w-[200px] xl:max-w-[250px]">
            <p className="font-medium break-words mb-[5px]">
              理想生活第三期 - 夏日能量 🥹
            </p>
            <div className="flex gap-2 items-center absolute bottom-3">
              <div className="w-[15px] h-[15px] relative">
                <Image src={profile} alt="" fill />
              </div>
              <p className="text-[12px] text-darkPink">使用者名稱</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Rooms;
