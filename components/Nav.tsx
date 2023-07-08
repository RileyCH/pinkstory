"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { UserLoginInitialState, UserDataType } from "@/utils/type";
import add from "../public/add.png";

const Nav = () => {
  const uid = useAppSelector(
    (state: { user: UserLoginInitialState }) => state.user.uid
  );
  // const [userData, setUserData] = useState<UserDataType>({
  //   uid: "",
  //   age: 0,
  //   bgImg: "",
  //   birth: {
  //     date: 0,
  //     month: 0,
  //     year: 0,
  //   },
  //   constellations: "",
  //   follower: [],
  //   following: [],
  //   followingCategory: {},
  //   gender: "Female",
  //   introduction: "",
  //   keptPost: [],
  //   liveStream: {
  //     roomId: "",
  //     hostRoomCode: "",
  //     guestRoomCode: "",
  //   },
  //   name: "",
  //   profileImg: "",
  //   registedDate: 0,
  //   thumbnailedPost: [],
  // });

  // const fetchUserData = async () => {
  //   if (uid) {
  //     await axios
  //       .get("/api/user-data", {
  //         headers: { Authorization: `Bearer ${uid}` },
  //       })
  //       .then((res) => {
  //         if (res.status === 200) {
  //           setUserData(res.data);
  //         }
  //       });
  //   }
  // };
  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  return (
    <nav className="fixed -bottom-7 bg-white py-[20px]">
      <Link href="/post">首頁</Link>
      <Link href="/live-stream">直播</Link>
      <Link href="/create-post">
        <Image src={add} alt="add a new post" width={30} height={30} />
      </Link>
      <Link href="/message">訊息</Link>
      {uid ? (
        <Link href={`/main/${uid}`}>主頁</Link>
      ) : (
        <Link href="/main">主頁</Link>
      )}
    </nav>
  );
};

export default Nav;
