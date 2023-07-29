"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/database";
import RoomPeers from "./RoomPeers";
import live2 from "@/public/live-stream/2.jpeg";
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
  const streamingData = [
    {
      cover:
        "https://i.pinimg.com/564x/0c/98/5b/0c985b27e32c2721c4ff2250e9a8fac7.jpg",
      title: "週末來趟戶外小旅行吧 ✈️",
      profileImg:
        "https://i.pinimg.com/564x/a3/f7/11/a3f7118efebbf323673625e0ff3462e6.jpg",
      name: "Annie",
      viewer: "9415",
    },
    {
      title: "最愛的烹飪秘笈大公開 🍳",
      name: "Sophia",
      viewer: "2319",
      cover:
        "https://i.pinimg.com/564x/13/21/7a/13217abce651e33dc2c72a22554de8c9.jpg",
      profileImg:
        "https://i.pinimg.com/564x/0a/00/ec/0a00ec6a5fe95b6c74bbaed437372159.jpg",
    },
    {
      title: "揭開攝影魔法的幕後 📸",
      name: "Oliver",
      viewer: "5682",
      cover:
        "https://i.pinimg.com/564x/97/c8/0a/97c80a756ae043d46035ad373224be47.jpg",
      profileImg:
        "https://i.pinimg.com/564x/2a/31/de/2a31de108bf780d3219add7b45687804.jpg",
    },
    {
      title: "潛水初體驗分享 🌊",
      name: "Lucas",
      viewer: "789",
      cover:
        "https://i.pinimg.com/564x/df/f6/9c/dff69c6fca645217336b0de7a5e20186.jpg",
      profileImg:
        "https://i.pinimg.com/564x/5c/5e/19/5c5e194f89150b22d3f5a2df33c48769.jpg",
    },
    {
      cover:
        "https://i.pinimg.com/564x/d7/6c/a8/d76ca86e79cdd7d2efdf46a2c9ef2236.jpg",
      title: "如果不會化妝就看這裡！",
      profileImg:
        "https://i.pinimg.com/564x/a3/f7/11/a3f7118efebbf323673625e0ff3462e6.jpg",
      name: "Abbie",
      viewer: "37455",
    },
    {
      cover: live2,
      title: "擺脫懶惰、積極動起來！",
      profileImg:
        "https://i.pinimg.com/564x/70/34/d8/7034d84e4544fbc5aba91e604f01fa67.jpg",
      name: "Mike",
      viewer: "4855",
    },
    {
      title: "探索叢林的神秘之旅 🌳",
      name: "Isabella",
      viewer: "4210",
      cover:
        "https://i.pinimg.com/564x/27/cc/35/27cc355dd67a674eb1dabbc149ab0d03.jpg",
      profileImg:
        "https://i.pinimg.com/564x/13/83/5d/13835d1ce3d4ca216a8f5cfeace333fd.jpg",
    },
    {
      title: "細說手工藝品背後故事 ✨",
      name: "Eva",
      viewer: "2875",
      cover:
        "https://i.pinimg.com/564x/2c/18/36/2c1836f002d4c9f7fb780a82c738b5f0.jpg",
      profileImg:
        "https://i.pinimg.com/564x/7a/1d/5c/7a1d5cecc5e0ccd39267951bd0fc1654.jpg",
    },
    {
      title: "徒步山林尋找冒險 🏔️",
      name: "Noah",
      viewer: "6213",
      cover:
        "https://i.pinimg.com/564x/b1/1d/5c/b11d5c02a1eea223dee88d25996c4d95.jpg",
      profileImg:
        "https://i.pinimg.com/564x/f4/77/4d/f4774db7a7ab2201d7c2b6ed08ee7f15.jpg",
    },
    {
      title: "品味葡萄酒的醉人之旅 🍷",
      name: "Lily",
      viewer: "3968",
      cover:
        "https://i.pinimg.com/564x/a7/8e/66/a78e6625672f236d02a7daadf22e46c6.jpg",
      profileImg:
        "https://i.pinimg.com/736x/93/2d/03/932d030036cc3b7bbb4eb26831501405.jpg",
    },
    {
      title: "浪漫遊覽古城風情 🏰",
      name: "Alexander",
      viewer: "5271",
      cover:
        "https://i.pinimg.com/564x/9a/ec/bb/9aecbb977951d777db090966d0b90c91.jpg",
      profileImg:
        "https://i.pinimg.com/736x/2a/06/fa/2a06fa310c16642ef9b6b9f062cf2a28.jpg",
    },
    {
      title: "探秘宇宙的奇妙旅程 🚀",
      name: "Mia",
      viewer: "4510",
      cover:
        "https://i.pinimg.com/564x/f3/6b/26/f36b269b931546fe06e5a3fa3e471f6d.jpg",
      profileImg:
        "https://i.pinimg.com/564x/79/d5/c2/79d5c23eb21a7b7a8b580c868d5b9f03.jpg",
    },
  ];

  useEffect(() => {
    const q = query(collection(db, "liveStream"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedRooms: HostEvent[] = [];
      querySnapshot.forEach((doc) => {
        updatedRooms.push(doc.data() as HostEvent);
      });

      setRooms(updatedRooms);
    });
    return unsubscribe();
  }, []);

  return (
    <div className="w-[95vw] mx-auto flex flex-wrap justify-between md:w-[90vw] md:max-w-[1200px] md:justify-start md:gap-3 xl:gap-4 2xl:max-w-[1600px]">
      {rooms.length > 0
        ? rooms.map((room: HostEvent) => (
            <Link
              key={room.data.room_id}
              href={`/live-stream/${room.data.room_id}/guest`}
              className="w-[calc(50%_-_4px)] my-1 rounded-lg shadow-lg cursor-pointer relative md:w-[calc(25%_-_15px)] 2xl:w-[calc(20%_-_15px)]"
            >
              <div className="w-[100%] h-[170px] relative md:h-[250px] xl:h-[300px] 2xl:h-[320px]">
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

      {streamingData.map((data, index) => (
        <Link
          key={index}
          href={`/live-stream/thisIsFakeData/guest`}
          className="w-[calc(50%_-_4px)] my-1 rounded-lg shadow-lg cursor-pointer relative md:w-[calc(25%_-_15px)] 2xl:w-[calc(20%_-_15px)]"
        >
          <div className="w-[100%] h-[170px] relative md:h-[250px] xl:h-[300px] 2xl:h-[320px]">
            <Image
              src={data.cover}
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
              <p className="text-white text-[10px]">{data.viewer}</p>
            </div>
          </div>

          <div className="max-w-[150px] px-[15px] py-[10px] md:max-w-[200px] xl:max-w-[250px] flex flex-col justify-between">
            <p className="font-medium break-words mb-[5px]">{data.title}</p>
            <div className="flex gap-2 items-center">
              <div className="w-[20px] h-[20px] relative">
                <Image
                  src={data.profileImg}
                  alt=""
                  fill
                  sizes="100%"
                  className="rounded-full"
                />
              </div>
              <p className="text-[12px] text-darkPink">{data.name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Rooms;
