import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import profile from "@/public/main/profile.png";
import { ChatRoomType, UserDataType, FormatTimeFunction } from "@/utils/type";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type SetChatRoomsFunction = React.Dispatch<React.SetStateAction<UserDataType>>;
type SetAlertFunction = React.Dispatch<React.SetStateAction<boolean>>;

const ChatUser = ({
  uid,
  room,
  setChattingUser,
  otherUid,
  formatTime,
  currentYear,
  currentMonth,
  currentDay,
  alert,
  setAlert,
}: {
  uid: string | null;
  room: ChatRoomType;

  setChattingUser: SetChatRoomsFunction;
  otherUid: string;
  formatTime: FormatTimeFunction;
  currentYear: number;
  currentMonth: number;
  currentDay: number;
  alert: boolean;
  setAlert: SetAlertFunction;
}) => {
  const [roomUsers, setRoomUsers] = useState<UserDataType>({
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

  useEffect(() => {
    const fetchOtherUser = async () => {
      await axios
        .get("/api/user-data", {
          headers: { Authorization: `Bearer ${otherUid}` },
        })
        .then((res) => {
          if (res.status === 200) {
            setRoomUsers({
              uid: res.data.uid,
              age: res.data.age,
              bgImg: res.data.bgImg,
              birth: res.data.birth,
              constellations: res.data.constellations,
              follower: res.data.follower,
              following: res.data.following,
              followingCategory: res.data.followingCategory,
              gender: res.data.gender,
              introduction: res.data.introduction,
              keptPost: res.data.keptPost,
              liveStream: res.data.liveStream,
              name: res.data.name,
              profileImg: res.data.profileImg,
              registedDate: res.data.registedDate,
              thumbnailedPost: res.data.thumbnailedPost,
            });
          }
        });
    };
    fetchOtherUser();
  }, [setChattingUser, otherUid]);

  useEffect(() => {
    if (room.data.message.slice(-1)[0].uid !== uid) {
      setAlert(true);
    }
  }, [room, setAlert, uid]);

  return (
    <div
      className="w-[95vw] mx-auto py-3 px-2 flex gap-3 items-center cursor-pointer hover:bg-themePink-100 hover:rounded-lg md:w-[30vw]"
      onClick={() => setChattingUser(roomUsers)}
    >
      <div className="w-[40px] h-[40px] relative md:w-[55px] md:h-[55px]">
        {roomUsers.profileImg ? (
          <Image
            src={roomUsers.profileImg ? roomUsers.profileImg : profile}
            alt="user profile image"
            fill
            sizes="100%"
            className="rounded-full object-cover"
          />
        ) : (
          <Skeleton count={1} height={55} width={55} circle={true} />
        )}
      </div>
      <div className="w-[95vw] mx-auto pr-1 md:pr-3 md:w-[calc(30vw_-_100px)]">
        <div className="md:w-[calc(30vw_-_110px)] flex gap-3 items-center">
          <p className="font-semibold truncate">
            {roomUsers.name ? (
              roomUsers.name
            ) : (
              <Skeleton count={1} height={15} width={50} circle={false} />
            )}
          </p>
          {/* {alert && (
            <div className="w-[10px] h-[10px] bg-themePink-600 rounded-full"></div>
          )} */}
        </div>
        <div className="flex justify-between items-center">
          <p className="md:w-[calc(30vw_-_180px)] text-[14px] truncate">
            {room.data.message.slice(-1)[0].uid === uid ? "你: " : ""}
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
                    room.data.message.slice(-1)[0].sentTime.nanoseconds
                  ).hour
                } : ${
                  formatTime(
                    room.data.message.slice(-1)[0].sentTime.seconds,
                    room.data.message.slice(-1)[0].sentTime.nanoseconds
                  ).minute
                }`
              : formatTime(
                  room.data.message.slice(-1)[0].sentTime.seconds,
                  room.data.message.slice(-1)[0].sentTime.nanoseconds
                ).year === currentYear
              ? `${
                  formatTime(
                    room.data.message.slice(-1)[0].sentTime.seconds,
                    room.data.message.slice(-1)[0].sentTime.nanoseconds
                  ).month
                }/${
                  formatTime(
                    room.data.message.slice(-1)[0].sentTime.seconds,
                    room.data.message.slice(-1)[0].sentTime.nanoseconds
                  ).day
                }`
              : `${
                  formatTime(
                    room.data.message.slice(-1)[0].sentTime.seconds,
                    room.data.message.slice(-1)[0].sentTime.nanoseconds
                  ).year
                }/${
                  formatTime(
                    room.data.message.slice(-1)[0].sentTime.seconds,
                    room.data.message.slice(-1)[0].sentTime.nanoseconds
                  ).month
                }/${
                  formatTime(
                    room.data.message.slice(-1)[0].sentTime.seconds,
                    room.data.message.slice(-1)[0].sentTime.nanoseconds
                  ).day
                }`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatUser;
