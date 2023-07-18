import { useEffect, SetStateAction } from "react";
import Image from "next/image";
import axios from "axios";
import profile from "@/public/main/profile.png";
import { ChatRoomType, UserDataType, FormatTimeFunction } from "@/utils/type";

type SetChatRoomsFunction = React.Dispatch<React.SetStateAction<UserDataType>>;
const ChatUser = ({
  uid,
  room,
  chattingUser,
  setChattingUser,
  otherUid,
  formatTime,
  currentYear,
  currentMonth,
  currentDay,
}: {
  uid: string | null;
  room: ChatRoomType;
  chattingUser: UserDataType;
  setChattingUser: SetChatRoomsFunction;
  otherUid: string;
  formatTime: FormatTimeFunction;
  currentYear: number;
  currentMonth: number;
  currentDay: number;
}) => {
  useEffect(() => {
    const fetchOtherUser = async () => {
      await axios
        .get("/api/user-data", {
          headers: { Authorization: `Bearer ${otherUid}` },
        })
        .then((res) => {
          if (res.status === 200) {
            setChattingUser(res.data);
          }
        });
    };
    fetchOtherUser();
  }, [setChattingUser, otherUid]);

  return (
    <div className="md:w-[30vw] flex gap-3 items-center py-3 px-2 cursor-pointer hover:bg-themePink-100 hover:rounded-lg">
      <div className="w-[40px] h-[40px] relative md:w-[55px] md:h-[55px]">
        <Image
          src={chattingUser.profileImg ? chattingUser.profileImg : profile}
          alt="user profile image"
          fill
          sizes="100%"
          className="rounded-full object-cover"
        />
      </div>
      <div className="w-[calc(30vw_-_100px)]">
        <p className="font-semibold md:w-[calc(30vw_-_150px)] truncate">
          {chattingUser.name ? chattingUser.name : "資料讀取中..."}
        </p>
        <div className="flex justify-between items-center">
          <p className="md:w-[calc(30vw_-_150px)] text-[14px] truncate">
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
