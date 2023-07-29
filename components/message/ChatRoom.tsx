"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/database";
import { useAppSelector } from "@/redux/hooks";
import { fetchData } from "@/redux/features/userDataSlice";
import InputArea from "@/components/message/InputArea";
import { ChatRoomType, UserDataType, FormatTimeFunction } from "@/utils/type";
import back from "@/public/back.png";
import profile from "@/public/main/profile.png";

type SetAlertFunction = React.Dispatch<React.SetStateAction<boolean>>;
type SetSelectRoomFunction = React.Dispatch<
  React.SetStateAction<string | null>
>;

const ChatRoom = ({
  roomId,
  formatTime,
  currentYear,
  currentMonth,
  currentDay,
  chattingUser,
  setAlert,
  setSelectRoom,
}: {
  roomId: string;
  formatTime: FormatTimeFunction;
  currentYear: number;
  currentMonth: number;
  currentDay: number;
  chattingUser: UserDataType;
  setAlert: SetAlertFunction;
  setSelectRoom: SetSelectRoomFunction;
}) => {
  const userData = useAppSelector((state) => state.fetchUser);
  const messageWrapper = useRef<any>(null);
  const [messages, setMessages] = useState<ChatRoomType["data"]>({
    roomId: "",
    uid: [],
    message: [],
  });
  const friendId = messages.uid.filter((id) => id !== userData.uid)[0];

  useEffect(() => {
    const messageDoc = doc(db, "messages", roomId);
    const unsubscribe = onSnapshot(messageDoc, (snapshot) => {
      if (snapshot.exists()) {
        setMessages({
          roomId: snapshot.data().roomId,
          uid: snapshot.data().uid,
          message: snapshot.data().message,
        });
      }
    });
  }, [roomId]);

  useEffect(() => {
    messageWrapper.current.scrollTop = messageWrapper.current.scrollHeight;
  }, [messages]);

  setAlert(false);

  return (
    <div className="w-[100vw] min-h-full fixed z-40 top-0 left-0 bg-white md:static">
      {
        <div className="md:w-[calc(70vw_-_30px)]">
          <div className="w-[100%] h-[70px] px-[15px] py-2 flex gap-5 items-center  bg-white z-30 border-b pb-2">
            <div
              onClick={() => setSelectRoom(null)}
              className="w-[25px] h-[25px] relative md:hidden"
            >
              <Image
                src={back}
                alt="back to message room page"
                fill
                sizes="100%"
              />
            </div>
            <div>
              <Link
                href={`/main/${friendId}`}
                className="relative flex gap-3 items-center"
              >
                <div className="w-[45px] h-[45px] relative">
                  <Image
                    src={
                      chattingUser.profileImg
                        ? chattingUser.profileImg
                        : profile
                    }
                    alt="friend profile"
                    fill
                    sizes="100%"
                    className="rounded-full object-cover"
                  />
                </div>

                <p className="font-semibold">{chattingUser.name}</p>
              </Link>
            </div>
          </div>

          <div
            className="text-[14px] mt-[5px] px-3 max-h-[calc(100vh_-_150px)] md:text-[16px] md:max-h-[calc(100vh_-_220px)] overflow-auto no-scrollbar md:mt-3 md:px-[15px]"
            ref={messageWrapper}
          >
            {messages.message.map((message, index) =>
              message.uid === friendId ? (
                <div key={index} className="flex gap-3 items-start mb-[20px]">
                  <div className="w-[30px] h-[30px] relative">
                    <Image
                      src={
                        chattingUser.profileImg
                          ? chattingUser.profileImg
                          : profile
                      }
                      alt="friend profile"
                      fill
                      sizes="100%"
                      className="rounded-full object-cover"
                    />
                  </div>

                  <div className="relative max-w-[85%]">
                    <p className="break-words bg-themeGray-100 px-[15px] py-[6px] rounded-full">
                      {message.content}
                    </p>
                    <p className="w-[80px] text-[8px] text-themeGray-500 pl-2 absolute ">
                      {formatTime(
                        message.sentTime.seconds,
                        message.sentTime.nanoseconds
                      ).year === currentYear &&
                      formatTime(
                        message.sentTime.seconds,
                        message.sentTime.nanoseconds
                      ).month === currentMonth &&
                      formatTime(
                        message.sentTime.seconds,
                        message.sentTime.nanoseconds
                      ).day === currentDay
                        ? `${
                            formatTime(
                              message.sentTime.seconds,
                              message.sentTime.nanoseconds
                            ).hour
                          } : ${
                            formatTime(
                              message.sentTime.seconds,
                              message.sentTime.nanoseconds
                            ).minute
                          }`
                        : formatTime(
                            message.sentTime.seconds,
                            message.sentTime.nanoseconds
                          ).year === currentYear
                        ? `${
                            formatTime(
                              message.sentTime.seconds,
                              message.sentTime.nanoseconds
                            ).month
                          }/${
                            formatTime(
                              message.sentTime.seconds,
                              message.sentTime.nanoseconds
                            ).day
                          }  ${
                            formatTime(
                              message.sentTime.seconds,
                              message.sentTime.nanoseconds
                            ).hour
                          } : ${
                            formatTime(
                              message.sentTime.seconds,
                              message.sentTime.nanoseconds
                            ).minute
                          }`
                        : `${
                            formatTime(
                              message.sentTime.seconds,
                              message.sentTime.nanoseconds
                            ).year
                          }/${
                            formatTime(
                              message.sentTime.seconds,
                              message.sentTime.nanoseconds
                            ).month
                          }/${
                            formatTime(
                              message.sentTime.seconds,
                              message.sentTime.nanoseconds
                            ).day
                          }`}
                    </p>
                  </div>
                </div>
              ) : message.uid === userData.uid ? (
                <div key={index} className="flex gap-3 justify-end items-start">
                  <div className="text-end relative mb-[30px] max-w-[85%]">
                    <p className="bg-themeGray-100 px-[15px] py-[6px] break-words rounded-full">
                      {message.content}
                    </p>
                    <p className="w-[80px] text-[8px] text-themeGray-500 pl-2 absolute right-1">
                      {formatTime(
                        message.sentTime.seconds,
                        message.sentTime.nanoseconds
                      ).year === currentYear &&
                      formatTime(
                        message.sentTime.seconds,
                        message.sentTime.nanoseconds
                      ).month === currentMonth &&
                      formatTime(
                        message.sentTime.seconds,
                        message.sentTime.nanoseconds
                      ).day === currentDay
                        ? `${
                            formatTime(
                              message.sentTime.seconds,
                              message.sentTime.nanoseconds
                            ).hour
                          } : ${
                            formatTime(
                              message.sentTime.seconds,
                              message.sentTime.nanoseconds
                            ).minute
                          }`
                        : formatTime(
                            message.sentTime.seconds,
                            message.sentTime.nanoseconds
                          ).year === currentYear
                        ? `${
                            formatTime(
                              message.sentTime.seconds,
                              message.sentTime.nanoseconds
                            ).month
                          }/${
                            formatTime(
                              message.sentTime.seconds,
                              message.sentTime.nanoseconds
                            ).day
                          }  ${
                            formatTime(
                              message.sentTime.seconds,
                              message.sentTime.nanoseconds
                            ).hour
                          } : ${
                            formatTime(
                              message.sentTime.seconds,
                              message.sentTime.nanoseconds
                            ).minute
                          }`
                        : `${
                            formatTime(
                              message.sentTime.seconds,
                              message.sentTime.nanoseconds
                            ).year
                          }/${
                            formatTime(
                              message.sentTime.seconds,
                              message.sentTime.nanoseconds
                            ).month
                          }/${
                            formatTime(
                              message.sentTime.seconds,
                              message.sentTime.nanoseconds
                            ).day
                          }`}
                    </p>
                  </div>
                  <div className="w-[30px] h-[30px] relative">
                    <Image
                      src={userData.profileImg ? userData.profileImg : profile}
                      alt="main user profile"
                      fill
                      sizes="100%"
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>
              ) : (
                ""
              )
            )}
          </div>

          <InputArea roomId={roomId} uid={userData.uid} />
        </div>
      }
    </div>
  );
};

export default ChatRoom;
