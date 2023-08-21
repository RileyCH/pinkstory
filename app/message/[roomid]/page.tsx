"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/database";
import { useAppSelector } from "@/redux/hooks";
import { ChatRoomType, UserDataType } from "@/utils/type";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import ChatUser from "@/components/message/ChatUser";
import ChatRoom from "@/components/message/ChatRoom";
import ChatRoomSkeleton from "@/components/skeleton/ChatRoomSkeleton";
import send from "@/public/message/send.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Chat = ({ params }: { params: { roomid: string } }) => {
  const userStatus = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
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
  const [alert, setAlert] = useState(false);
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
    if (userStatus.loginStatus) {
      setIsLoading(true);
      const q = query(
        collection(db, "messages"),
        where("uid", "array-contains", userStatus.uid)
      );
      const newMessage = onSnapshot(q, (snapshot) => {
        setIsLoading(false);
        snapshot.docChanges().forEach((change) => {
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

      return () => {
        newMessage();
      };
    }
  }, [userStatus.loginStatus, userStatus.uid]);

  return (
    <div>
      <Header />
      {userStatus.loginStatus ? (
        <div className="pt-[50px] md:pt-[70px] md:flex md:gap-4">
          <div className="w-[100vw] min-h-[calc(100vh_-_70px)] max-h-[calc(100vh_-_200px)] overflow-auto no-scrollbar bg-themeGray-50 md:w-[30vw] md:min-h-[calc(100vh_-_70px)] md:py-[15px] md:px-[15px]">
            <p className="text-[20px] font-semibold text-themePink-700 pl-[12px] mt-5 mb-1 ml-4 relative before:w-1 before:h-5 before:absolute before:bg-themePink-400 before:top-[6px] before:left-0 before:rounded-md md:text-[24px] md:before:h-[26px] md:mb-3 md:ml-2 md:mt-2">
              訊息
            </p>
            {isLoading ? (
              <ChatRoomSkeleton />
            ) : !isLoading && chatRooms.length === 0 ? (
              <div className="text-themeGray-600 text-center mt-[20vh] mb-[20px] xl:text-[18px]">
                目前尚無聊天訊息
              </div>
            ) : (
              <div>
                {chatRooms.map((room, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectRoom(room.chatRoomId);
                    }}
                  >
                    <ChatUser
                      uid={userStatus.uid}
                      room={room}
                      otherUid={
                        room.data.uid.filter((id) => id !== userStatus.uid)[0]
                      }
                      setChattingUser={setChattingUser}
                      formatTime={formatTime}
                      currentYear={currentYear}
                      currentMonth={currentMonth}
                      currentDay={currentDay}
                      alert={alert}
                      setAlert={setAlert}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          {isLoading ? (
            <div className="hidden md:flex md:flex-col md:justify-center md:items-center md:w-[280px] md:mx-auto">
              <Skeleton
                count={1}
                width="100px"
                height="100px"
                circle={true}
                className="mb-8"
              />
              <Skeleton
                count={1}
                width="100px"
                height="35px"
                circle={false}
                className="mb-3"
              />
              <Skeleton count={1} width="240px" height="20px" circle={false} />
            </div>
          ) : selectRoom ? (
            <ChatRoom
              roomId={selectRoom}
              chattingUser={chattingUser}
              formatTime={formatTime}
              currentYear={currentYear}
              currentMonth={currentMonth}
              currentDay={currentDay}
              setAlert={setAlert}
              setSelectRoom={setSelectRoom}
            />
          ) : (
            <div className="hidden md:flex md:flex-col md:justify-center md:items-center md:w-[280px] md:mx-auto">
              <div className="w-[80px] h-[80px] relative mb-5">
                <Image
                  src={send}
                  alt="message"
                  fill
                  sizes="100%"
                  className="object-cover"
                />
              </div>
              <p className="text-[28px] font-medium mb-3">訊息內容</p>
              <p className="text-[18px]">你還沒選擇要跟哪位朋友聊聊喔～</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center pt-[250px]">
          <p className="mb-[30px]">
            您目前尚未登入，
            <br />
            需登入才能查看訊息
          </p>
          <Link
            href="/"
            className="bg-themePink-400 hover:bg-themePink-500 text-white px-[10px] py-[10px] rounded-lg cursor-pointer"
          >
            點此登入
          </Link>
          <Nav />
        </div>
      )}
      <Nav />
    </div>
  );
};

export default Chat;
