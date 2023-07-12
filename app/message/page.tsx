"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";
import { ChatRoomType } from "@/utils/type";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import profile from "@/public/main/profile.png";

const Message = () => {
  const uid = useAppSelector((state) => state.user.uid);
  const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      await axios
        .get("/api/message/rooms", {
          headers: { Authorization: `Bearer ${uid}` },
        })
        .then((res) => {
          if (res.status === 200) {
            setChatRooms(res.data);
          }
        });
    };
    fetchChatRooms();
  }, [uid]);

  return (
    <div>
      <Header />
      <div className="pt-[60px] md:pt-[85px]">
        {uid ? (
          <div>
            {chatRooms.map((room) => (
              <Link
                key={room.chatRoomId}
                href={`/message/${room.chatRoomId}`}
                className="w-[100vw] border border-gray-200 p-[20px] flex gap-2 items-start"
              >
                <Image src={profile} alt="" width={30} height={30} />
                <div>
                  <p>
                    使用者
                    {room.data.uid.filter((id) => id !== uid)[0].slice(0, 5)}
                  </p>
                  <div className="w-[80vw] flex justify-between items-center">
                    <p>
                      <span>
                        {room.data.message.slice(-1)[0].uid === uid
                          ? "你： "
                          : ""}
                      </span>
                      {room.data.message.slice(-1)[0].content}
                    </p>
                    <p className="text-[8px]">
                      {new Date(
                        room.data.message.slice(-1)[0].sentTime.seconds * 1000
                      ).toLocaleString()}
                    </p>

                    {/* <p className="w-[25px] h-[25px] bg-[#FB6E6E] flex justify-center items-center rounded-full text-white">
                2
              </p> */}
                  </div>
                </div>
              </Link>
            ))}
            {chatRooms.length === 0 ? (
              <p className="text-center"> －訊息載入中－</p>
            ) : (
              <p className="text-center mt-5"> －沒有其他訊息了－</p>
            )}
          </div>
        ) : (
          <div className="text-center mt-[250px]">
            <p className="mb-[30px]">
              您目前尚未登入，
              <br />
              需登入才能查看訊息
            </p>
            <Link
              href="/main"
              className="bg-[#FB6E6E] hover:bg-[#b62c2c] text-white px-[20px] py-[10px] rounded-sm cursor-pointer"
            >
              點此登入
            </Link>
          </div>
        )}

        <Nav />
      </div>
    </div>
  );
};

export default Message;
