"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/database";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { fetchData } from "@/redux/features/userDataSlice";
import InputArea from "@/components/message/InputArea";
import { ChatRoomType, UserDataType } from "@/utils/type";
import back from "@/public/back.png";
import profile from "@/public/main/profile.png";

type FormatTimeFunction = (
  seconds: number,
  nanoseconds: number
) => {
  year: number;
  month: number;
  day: number;
  hour: string | number;
  minute: string | number;
};

const ChatRoom = ({
  roomId,
  formatTime,
  currentYear,
  currentMonth,
  currentDay,
  chattingUser,
}: {
  roomId: string;
  formatTime: FormatTimeFunction;
  currentYear: number;
  currentMonth: number;
  currentDay: number;
  chattingUser: UserDataType;
}) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.fetchUser);
  const messageWrapper = useRef<any>(null);
  const [messages, setMessages] = useState<ChatRoomType["data"]>({
    roomId: "",
    uid: [],
    message: [],
  });
  const friendId = messages.uid.filter((id) => id !== userData.uid)[0];

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

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
  console.log(chattingUser);

  useEffect(() => {
    messageWrapper.current.scrollTop = messageWrapper.current.scrollHeight;
  }, [messages]);

  return (
    <div className="">
      {
        <div className="md:py-[10px] md:w-[calc(70vw_-_30px)]">
          <div className="w-[100%] h-[60px] px-[15px] flex gap-5 items-center  bg-white z-30 border-b pb-2">
            <Link
              href="/message"
              className="w-[25px] h-[25px] relative md:hidden"
            >
              <Image
                src={back}
                alt="back to message room page"
                fill
                sizes="100%"
              />
            </Link>
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
            className="mt-[100px] max-h-[calc(100vh_-_220px)] overflow-auto no-scrollbar md:mt-3 md:px-[15px]"
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

                  <div className="relative">
                    <p className="bg-themeGray-100 px-[15px] py-[6px] rounded-full">
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
                  <div className="text-end relative mb-[30px]">
                    <p className="bg-themeGray-100 px-[15px] py-[6px] rounded-full">
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
