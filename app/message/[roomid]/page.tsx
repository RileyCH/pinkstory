"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/database";
import { useAppSelector } from "@/redux/hooks";
import InputArea from "@/components/message/InputArea";
import { ChatRoomType } from "@/utils/type";
import back from "@/public/back.png";
import profile from "@/public/main/profile.png";

const ChatRoom = ({ params }: { params: { roomid: string } }) => {
  const uid = useAppSelector((state) => state.user.uid);
  const messageWrapper = useRef<any>(null);
  const [messages, setMessages] = useState<ChatRoomType["data"]>({
    roomId: "",
    uid: [],
    message: [],
  });
  const friendId = messages.uid.filter((id) => id !== uid)[0];

  useEffect(() => {
    const messageDoc = doc(db, "messages", params.roomid);
    const unsubscribe = onSnapshot(messageDoc, (snapshot) => {
      if (snapshot.exists()) {
        setMessages({
          roomId: snapshot.data().roomId,
          uid: snapshot.data().uid,
          message: snapshot.data().message,
        });
      }
    });
  }, [params.roomid]);

  useEffect(() => {
    messageWrapper.current.scrollTop = messageWrapper.current.scrollHeight;
  }, [messages]);

  return (
    <div>
      {uid && (
        <div className="mb-[80px]">
          <div className="w-[100vw] h-[100px] py-[50px] px-[15px] mb-2 flex gap-5 items-center fixed top-0 left-0 bg-white z-30">
            <Link href="/message">
              <Image
                src={back}
                alt="back to main page"
                width={25}
                height={25}
              />
            </Link>
            <div>
              <Link
                href={`/message`}
                className="relative flex gap-3 items-center"
              >
                <Image
                  src={profile}
                  alt="friend profile"
                  width={40}
                  height={40}
                />
                <p>{friendId && friendId.slice(0, 5)}</p>
              </Link>
            </div>
          </div>

          <div
            className="w-[100vw] mt-[100px] max-h-[80vh] overflow-auto"
            ref={messageWrapper}
          >
            {messages.message.map((message) =>
              message.uid === friendId ? (
                <div
                  key={message.sentTime.seconds}
                  className="flex gap-3 items-start mb-[20px]"
                >
                  <Image
                    src={profile}
                    alt="friend profile"
                    width={40}
                    height={40}
                  />
                  <div>
                    <p>{friendId.slice(0, 5)}</p>
                    <p className="bg-gray-100 p-[12px] rounded-lg">
                      {message.content}
                    </p>
                    <p className="text-[8px]">
                      {new Date(
                        message.sentTime.seconds * 1000
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              ) : message.uid === uid ? (
                <div
                  key={message.sentTime.seconds}
                  className="flex gap-3 justify-end items-start mb-[20px]"
                >
                  <div className="text-end">
                    <p>{uid.slice(0, 5)}</p>
                    <p className="bg-gray-100 p-[12px] rounded-lg">
                      {message.content}
                    </p>
                    <p className="text-[8px]">
                      {new Date(
                        message.sentTime.seconds * 1000
                      ).toLocaleString()}
                    </p>
                  </div>
                  <Image
                    src={profile}
                    alt="friend profile"
                    width={40}
                    height={40}
                  />
                </div>
              ) : (
                ""
              )
            )}
          </div>

          <InputArea roomId={params.roomid} uid={uid} />
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
