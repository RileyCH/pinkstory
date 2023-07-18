"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/database";
import RoomPeers from "./RoomPeers";
import Live from "@/public/background/landing.png";
import live1 from "@/public/live-stream/1.png";
import live2 from "@/public/live-stream/2.jpeg";
import live3 from "@/public/live-stream/3.png";
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
    <div className="w-[95vw] max-w-[1200px] mx-auto flex flex-wrap justify-between md:flex md:justify-start md:gap-3 md:w-[90vw] md:mx-auto xl:gap-4">
      {rooms.length > 0
        ? rooms.map((room: HostEvent) => (
            <Link
              key={room.data.room_id}
              href={`/live-stream/${room.data.room_id}/guest`}
              className="my-1 rounded-lg shadow-lg cursor-pointer"
            >
              <div className="w-[47vw] h-[170px] relative md:w-[29vw] md:h-[250px] xl:w-[20vw] xl:h-[300px]">
                <Image
                  src={`${JSON.parse(room.data?.user_data)?.cover}`}
                  alt="live stream cover picture from host"
                  fill
                  sizes="100%"
                  className="object-cover object-center rounded-t-lg"
                />
                <div className="w-[78px] bg-black bg-opacity-40 px-[7px] py-[2px] flex gap-2 justify-center items-center rounded-full absolute top-3 right-3">
                  <div className="w-[15px] h-[15px] relative">
                    <Image
                      src={live}
                      alt="live status icon"
                      fill
                      sizes="100%"
                    />
                  </div>
                  <p className="text-white text-[10px]">直播中</p>
                </div>
                <div className="flex gap-2 items-center absolute right-3 bottom-2 bg-black bg-opacity-20 p-2 rounded-lg">
                  <div className="w-[15px] h-[15px] relative">
                    <Image src={audience} alt="viewer icon" fill sizes="100%" />
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
                      alt="host profile"
                      fill
                      sizes="100%"
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
        href={`/live-stream/7878787878/guest`}
        className="my-1 rounded-lg shadow-lg cursor-pointer"
      >
        <div className="w-[47vw] h-[170px] relative md:w-[29vw] md:h-[250px] xl:w-[20vw] xl:h-[300px]">
          <Image
            src={live3}
            alt=""
            fill
            sizes="100%"
            className="object-cover object-center rounded-t-lg"
          />
          <div className="w-[78px] bg-black bg-opacity-40 px-[7px] py-[2px] flex gap-2 justify-center items-center rounded-full absolute top-3 right-3">
            <div className="w-[15px] h-[15px] relative">
              <Image src={live} alt="" fill sizes="100%" />
            </div>
            <p className="text-white text-[10px]">直播中</p>
          </div>
          <div className="flex gap-2 items-center absolute right-3 bottom-2 bg-black bg-opacity-20 p-2 rounded-lg">
            <div className="w-[15px] h-[15px] relative">
              <Image src={audience} alt="" fill sizes="100%" />
            </div>
            <p className="text-white text-[10px]">37455</p>
          </div>
        </div>

        <div className="max-w-[150px] px-[15px] py-[10px] md:max-w-[200px] xl:max-w-[250px] flex flex-col justify-between">
          <p className="font-medium break-words mb-[5px]">
            如果不會化妝就看這裡！
          </p>
          <div className="flex gap-2 items-center">
            <div className="w-[20px] h-[20px] relative">
              <Image
                src="https://i.pinimg.com/564x/a3/f7/11/a3f7118efebbf323673625e0ff3462e6.jpg"
                alt=""
                fill
                sizes="100%"
                className="rounded-full"
              />
            </div>
            <p className="text-[12px] text-darkPink">Abbie</p>
          </div>
        </div>
      </Link>

      <Link
        href={`/live-stream/7878787878/guest`}
        className="my-1 rounded-lg shadow-lg cursor-pointer"
      >
        <div className="w-[47vw] h-[170px] relative md:w-[29vw] md:h-[250px] xl:w-[20vw] xl:h-[300px]">
          <Image
            src={live2}
            alt=""
            fill
            sizes="100%"
            className="object-cover object-center rounded-t-lg"
          />
          <div className="w-[78px] bg-black bg-opacity-40 px-[7px] py-[2px] flex gap-2 justify-center items-center rounded-full absolute top-3 right-3">
            <div className="w-[15px] h-[15px] relative">
              <Image src={live} alt="" fill sizes="100%" />
            </div>
            <p className="text-white text-[10px]">直播中</p>
          </div>
          <div className="flex gap-2 items-center absolute right-3 bottom-2 bg-black bg-opacity-20 p-2 rounded-lg">
            <div className="w-[15px] h-[15px] relative">
              <Image src={audience} alt="" fill sizes="100%" />
            </div>
            <p className="text-white text-[10px]">4855</p>
          </div>
        </div>

        <div className="max-w-[150px] px-[15px] py-[10px] md:max-w-[200px] xl:max-w-[250px] flex flex-col justify-between">
          <p className="font-medium break-words mb-[5px]">
            擺脫懶惰、積極動起來！
          </p>
          <div className="flex gap-2 items-center">
            <div className="w-[20px] h-[20px] relative">
              <Image
                src="https://i.pinimg.com/564x/70/34/d8/7034d84e4544fbc5aba91e604f01fa67.jpg"
                alt=""
                fill
                sizes="100%"
                className="rounded-full"
              />
            </div>
            <p className="text-[12px] text-darkPink">Mike</p>
          </div>
        </div>
      </Link>

      <Link
        href={`/live-stream/7878787878/guest`}
        className="my-1 rounded-lg shadow-lg cursor-pointer"
      >
        <div className="w-[47vw] h-[170px] relative md:w-[29vw] md:h-[250px] xl:w-[20vw] xl:h-[300px]">
          <Image
            src={live1}
            alt=""
            fill
            sizes="100%"
            className="object-cover object-center rounded-t-lg"
          />
          <div className="w-[78px] bg-black bg-opacity-40 px-[7px] py-[2px] flex gap-2 justify-center items-center rounded-full absolute top-3 right-3">
            <div className="w-[15px] h-[15px] relative">
              <Image src={live} alt="" fill sizes="100%" />
            </div>
            <p className="text-white text-[10px]">直播中</p>
          </div>
          <div className="flex gap-2 items-center absolute right-3 bottom-2 bg-black bg-opacity-20 p-2 rounded-lg">
            <div className="w-[15px] h-[15px] relative">
              <Image src={audience} alt="" fill sizes="100%" />
            </div>
            <p className="text-white text-[10px]">485</p>
          </div>
        </div>

        <div className="max-w-[150px] px-[15px] py-[10px] md:max-w-[200px] xl:max-w-[250px] flex flex-col justify-between">
          <p className="font-medium break-words mb-[5px]">
            沒想過原來寫Code這麼累？
          </p>
          <div className="flex gap-2 items-center">
            <div className="w-[20px] h-[20px] relative">
              <Image
                src={live1}
                alt=""
                fill
                sizes="100%"
                className="rounded-full"
              />
            </div>
            <p className="text-[12px] text-darkPink">Surfer Alex</p>
          </div>
        </div>
      </Link>

      <Link
        href={`/live-stream/7878787878/guest`}
        className="my-1 rounded-lg shadow-lg cursor-pointer"
      >
        <div className="w-[47vw] h-[170px] relative md:w-[29vw] md:h-[250px] xl:w-[20vw] xl:h-[300px]">
          <Image
            src={Live}
            alt=""
            fill
            sizes="100%"
            className="object-cover object-center rounded-t-lg"
          />
          <div className="w-[78px] bg-black bg-opacity-40 px-[7px] py-[2px] flex gap-2 justify-center items-center rounded-full absolute top-3 right-3">
            <div className="w-[15px] h-[15px] relative">
              <Image src={live} alt="" fill sizes="100%" />
            </div>
            <p className="text-white text-[10px]">直播中</p>
          </div>
          <div className="flex gap-2 items-center absolute right-3 bottom-2 bg-black bg-opacity-20 p-2 rounded-lg">
            <div className="w-[15px] h-[15px] relative">
              <Image src={audience} alt="" fill />
            </div>
            <p className="text-white text-[10px]">9415</p>
          </div>
        </div>

        <div className="max-w-[150px] px-[15px] py-[10px] md:max-w-[200px] xl:max-w-[250px] flex flex-col justify-between">
          <p className="font-medium break-words mb-[5px]">
            週末來趟戶外小旅行吧 ✈️
          </p>
          <div className="flex gap-2 items-center">
            <div className="w-[20px] h-[20px] relative">
              <Image
                src="https://i.pinimg.com/564x/a3/f7/11/a3f7118efebbf323673625e0ff3462e6.jpg"
                alt=""
                fill
                sizes="100%"
                className="rounded-full"
              />
            </div>
            <p className="text-[12px] text-darkPink">Annie</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Rooms;
