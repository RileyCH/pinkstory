"use client";
import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/database";
import { ChatRoomType, UserDataType } from "@/utils/type";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import ChatUser from "@/components/message/ChatUser";
import ChatRoom from "@/components/message/ChatRoom";

const Chat = () => {
  const [uid, setUid] = useState<string | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);
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
    const q = query(
      collection(db, "messages"),
      where("uid", "array-contains", uid)
    );
    const newMessage = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log(change.doc.data());

        setChatRooms((prev) => {
          const unChangedRoom = prev.filter(
            (room) => room.chatRoomId !== change.doc.data().roomId
          );
          return [
            ...unChangedRoom,
            {
              chatRoomId: change.doc.data().roomId,
              data: change.doc.data() as ChatRoomType["data"],
            },
          ];
        });
      });
    });
  }, [uid]);

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
              {chatRooms.map((room, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectRoom(room.chatRoomId);
                    setChattingUser(chattingUser);
                  }}
                >
                  <ChatUser
                    uid={uid}
                    room={room}
                    otherUid={room.data.uid.filter((id) => id !== uid)[0]}
                    chattingUser={chattingUser}
                    setChattingUser={setChattingUser}
                    formatTime={formatTime}
                    currentYear={currentYear}
                    currentMonth={currentMonth}
                    currentDay={currentDay}
                  />
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
