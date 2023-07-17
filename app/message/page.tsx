"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/database";
import {
  ChatRoomType,
  ChatWithOtherUserType,
  UserDataType,
} from "@/utils/type";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import ChatRoom from "@/components/message/ChatRoom";
import profile from "@/public/main/profile.png";

const Chat = () => {
  const [uid, setUid] = useState<string | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);
  const [chatWithOtherUser, setChatWithOtherUser] = useState<
    ChatWithOtherUserType[]
  >([]);
  const [selectRoom, setSelectRoom] = useState<string | null>(null);
  const [chattingUser, setChattingUser] = useState<UserDataType>({
    uid: "",
    age: 0,
    bgImg: "",
    birth: {
      date: 0,
      month: 0,
      year: 0,
    },
    constellations: "",
    follower: [],
    following: [],
    followingCategory: { [""]: 0 },
    gender: "",
    introduction: "",
    keptPost: [],
    liveStream: {
      roomId: "",
      hostRoomCode: "",
      guestRoomCode: "",
    },
    name: "",
    profileImg: "",
    registedDate: 0,
    thumbnailedPost: [],
  });
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const formatTime = (seconds: number, nanoseconds: number) => {
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;
    const resultDate = new Date(milliseconds);
    return {
      year: resultDate.getFullYear(),
      month: resultDate.getMonth() + 1,
      day: resultDate.getDate(),
      hour:
        resultDate.getHours() > 9
          ? resultDate.getHours()
          : `0${resultDate.getHours()}`,
      minute:
        resultDate.getMinutes() > 9
          ? resultDate.getMinutes()
          : `0${resultDate.getMinutes()}`,
    };
  };

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
  }, []);

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

  // useEffect(() => {
  //   const q = query(
  //     collection(db, "messages"),
  //     where("uid", "array-contains", uid)
  //   );
  //   const newMessages = onSnapshot(q, (snapshot) => {
  //     snapshot.docChanges().forEach((change) => {
  //       console.log(change.doc.data());
  //       console.log("chatWithOtherUser2", chatWithOtherUser);

  //       // setChatWithOtherUser((prev) => {
  //       //   const oldMessage = chatWithOtherUser.filter(
  //       //     (room) => room.chatRoomId === change.doc.data().roomId
  //       //   )[0];
  //       //   // const filterMessage = prev.filter(
  //       //   //   (room) => room.chatRoomId !== change.doc.data().roomId
  //       //   // );
  //       //   console.log("oldMessage", oldMessage);

  //       //   return [
  //       //     ...filterMessage,
  //       //     {
  //       //       chatRoomId: oldMessage.chatRoomId,
  //       //       other: oldMessage.other,
  //       //       data: {
  //       //         ...oldMessage.data,
  //       //         message: change.doc.data(),
  //       //       },
  //       //     },
  //       //   ];
  //       // });

  //       // const filterMessage = chatRooms.filter(
  //       //   (data) => data.chatRoomId !== change.doc.data().roomId
  //       // );
  //       // setChatRooms([
  //       //   ...filterMessage,
  //       //   {
  //       //     chatRoomId: change.doc.data().roomId,
  //       //     data: {
  //       //       roomId: change.doc.data().roomId,
  //       //       uid: change.doc.data().uid,
  //       //       message: change.doc.data().message,
  //       //     },
  //       //   },
  //       // ]);
  //     });
  //   });
  // }, [uid]);

  useEffect(() => {
    chatRooms.map((room) => {
      const otherUid = room.data.uid.filter((id) => id !== uid)[0];

      const fetchOtherUser = async () => {
        await axios
          .get("/api/user-data", {
            headers: { Authorization: `Bearer ${otherUid}` },
          })
          .then((res) => {
            if (res.status === 200) {
              setChatWithOtherUser((prev) => [
                ...prev,
                {
                  ...room,
                  other: res.data,
                },
              ]);
            }
          });
      };
      fetchOtherUser();
    });
  }, [chatRooms, uid]);

  return (
    <div>
      <Header />
      <div className="pt-[50px] md:pt-[70px] md:flex md:gap-4">
        <div className="w-[100vw] min-h-[calc(100vh_-_70px)] max-h-[calc(100vh_-_200px)] overflow-auto no-scrollbar bg-themeGray-50 md:w-[30vw] md:min-h-[calc(100vh_-_70px)] md:py-[15px] md:px-[15px]">
          <p className="text-[16px] font-semibold text-themePink-700 pl-[12px] mb-2 relative before:w-1 before:h-5 before:absolute before:bg-themePink-400 before:top-[6px] before:left-0 before:rounded-md md:text-[24px] md:before:h-[26px] md:mb-6">
            訊息
          </p>
          {chatRooms.length > 0 ? (
            <div>
              {chatWithOtherUser.map((room, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectRoom(room.chatRoomId);
                    setChattingUser(room.other);
                  }}
                  className="flex gap-3 items-center py-3 px-2 cursor-pointer hover:bg-themePink-100 hover:rounded-lg"
                >
                  <div className="w-[40px] h-[40px] relative md:w-[55px] md:h-[55px]">
                    <Image
                      src={
                        room.other.profileImg ? room.other.profileImg : profile
                      }
                      alt="user profile image"
                      fill
                      sizes="100%"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="w-[calc(100%_-_75px)]">
                    <p className="font-semibold md:w-[calc(100%_-_50px)] truncate">
                      {room.other.name ? room.other.name : "資料讀取中..."}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="md:w-[calc(100%_-_70px)] text-[14px] truncate">
                        {room.data.message.slice(-1)[0].uid === uid
                          ? "你: "
                          : ""}
                        {room.data.message.slice(-1)[0].content}
                      </p>
                      <p className="text-[12px] text-themeGray-600">
                        {formatTime(
                          room.data.message.slice(-1)[0].sentTime.seconds,
                          room.data.message.slice(-1)[0].sentTime.nanoseconds
                        ).year === currentYear &&
                        formatTime(
                          room.data.message.slice(-1)[0].sentTime.seconds,
                          room.data.message.slice(-1)[0].sentTime.nanoseconds
                        ).month === currentMonth &&
                        formatTime(
                          room.data.message.slice(-1)[0].sentTime.seconds,
                          room.data.message.slice(-1)[0].sentTime.nanoseconds
                        ).day === currentDay
                          ? `${
                              formatTime(
                                room.data.message.slice(-1)[0].sentTime.seconds,
                                room.data.message.slice(-1)[0].sentTime
                                  .nanoseconds
                              ).hour
                            } : ${
                              formatTime(
                                room.data.message.slice(-1)[0].sentTime.seconds,
                                room.data.message.slice(-1)[0].sentTime
                                  .nanoseconds
                              ).minute
                            }`
                          : formatTime(
                              room.data.message.slice(-1)[0].sentTime.seconds,
                              room.data.message.slice(-1)[0].sentTime
                                .nanoseconds
                            ).year === currentYear
                          ? `${
                              formatTime(
                                room.data.message.slice(-1)[0].sentTime.seconds,
                                room.data.message.slice(-1)[0].sentTime
                                  .nanoseconds
                              ).month
                            }/${
                              formatTime(
                                room.data.message.slice(-1)[0].sentTime.seconds,
                                room.data.message.slice(-1)[0].sentTime
                                  .nanoseconds
                              ).day
                            }`
                          : `${
                              formatTime(
                                room.data.message.slice(-1)[0].sentTime.seconds,
                                room.data.message.slice(-1)[0].sentTime
                                  .nanoseconds
                              ).year
                            }/${
                              formatTime(
                                room.data.message.slice(-1)[0].sentTime.seconds,
                                room.data.message.slice(-1)[0].sentTime
                                  .nanoseconds
                              ).month
                            }/${
                              formatTime(
                                room.data.message.slice(-1)[0].sentTime.seconds,
                                room.data.message.slice(-1)[0].sentTime
                                  .nanoseconds
                              ).day
                            }`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-[14px] text-themeGray-600 text-center mt-[30px] mb-[20px]">
                -- 沒有其他對話了 --
              </div>
            </div>
          ) : (
            <p className="text-center">訊息讀取中...</p>
          )}
        </div>
        {selectRoom ? (
          <ChatRoom
            roomId={selectRoom}
            chattingUser={chattingUser}
            formatTime={formatTime}
            currentYear={currentYear}
            currentMonth={currentMonth}
            currentDay={currentDay}
          />
        ) : (
          <div className="hidden md:flex md:flex-col md:justify-center md:items-center md:w-[200px] md:mx-auto">
            <p className="text-[18px] font-medium">你的訊息</p>
            <p className="text-[14px]">傳送相片或訊息給朋友吧～</p>
          </div>
        )}
      </div>
      <Nav />
    </div>
  );
};

export default Chat;
