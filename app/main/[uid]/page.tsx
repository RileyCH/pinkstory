"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";
import Nav from "@/components/Nav";
import profile from "@/public/main/profile.png";
import female from "@/public/main/female.png";
import male from "@/public/main/male.png";
import plus from "@/public/create-post/plus.png";

type UserData = {
  uid: string;
  age: number | null;
  bgImg: string | null;
  birth: {
    date: number | null;
    month: number | null;
    year: number | null;
  };
  constellations: string | null;
  follower: string[] | [];
  following: string[] | [];
  followingCategory: {
    book: number;
    food: number;
    pet: number;
    travel: number;
  };
  gender: string;
  introduction: string | null;
  keptPost: string[] | [];
  liveStreamRoomID: string;
  name: string;
  profileImg: string | null;
  registedDate: number;
  thumbnailedPost: string[] | [];
};

function User({ params }: { params: { uid: string } }) {
  // const user = useAppSelector((state) => state.user);
  const [user, setUser] = useState<string | null>("");
  useEffect(() => {
    if (localStorage.getItem("uid")) {
      setUser(localStorage.getItem("uid"));
    }
  }, []);
  const [userData, setUserData] = useState({
    uid: user,
    age: 27,
    bgImg:
      "https://firebasestorage.googleapis.com/v0/b/pinky-823b9.appspot.com/o/bntWcXZUSKQ46EeJtei73g3pijs1%2Fimages%2FBFHzIrbE3Dv4UVR5YGNz?alt=media&token=0dabc156-6ec0-4df1-9267-7bb2b6bcb0a4",
    birth: {
      date: 1,
      month: 1,
      year: 2000,
    },
    constellations: "牡羊座",
    follower: [
      "ZDgxNXpGBOP7RMwA0hcTolE943Q2",
      "FriQDBcHKiXAxX44iwFa9Ot6KhK2",
      "COgPAkDZi4MS2feF7SlZ1lVrkHF3",
    ],
    following: [
      "1IG3QsrVWgbJrhkv022gpyDxRsr2",
      "zIUwj5lt3GgQvlpeMcit7DY92P83",
      "YoWrIN1BR7NCWGWGYsFdHWNNox23",
    ],
    followingCategory: {
      book: 85,
      food: 43,
      pet: 98,
      travel: 167,
    },
    gender: "Female",
    introduction:
      "上班族女生，積極進取，善於溝通，勇於面對挑戰，追求平衡與成長。",
    keptPost: ["fD0d9HyQJZDflTUkFtw4", "gTNuEkeR0nSB1RobylKe"],
    liveStreamRoomID: "6490284b06cb49564217643c",
    name: "Annie",
    profileImg:
      "https://firebasestorage.googleapis.com/v0/b/pinky-823b9.appspot.com/o/bntWcXZUSKQ46EeJtei73g3pijs1%2Fimages%2FBFHzIrbE3Dv4UVR5YGNz?alt=media&token=0dabc156-6ec0-4df1-9267-7bb2b6bcb0a4",
    registedDate: "time",
    thumbnailedPost: ["fD0d9HyQJZDflTUkFtw4", "gTNuEkeR0nSB1RobylKe"],
  });

  useEffect(() => {
    if (user) {
      const fetchUserData = () => {
        axios
          .get("/api/user-data", {
            headers: { Authorization: `Bearer ${user}` },
          })
          .then((res) => {
            if (res.status === 200) {
              setUserData(res.data);
            }
          });
      };
      fetchUserData();
    }
  }, [user]);

  return (
    <div>
      <div>
        <div className="flex items-center mb-[20px]">
          <div className="relative mx-[20px]">
            <Image src={profile} alt="profile icon" width={70} height={70} />
            <div className="w-[20px] h-[20px] bg-red-100 flex justify-center items-center rounded-full cursor-pointer absolute right-0 bottom-1">
              <Image src={plus} alt="profile icon" width={7} height={7} />
            </div>
          </div>

          <div>
            <p>riley</p>
            <p>帳號</p>
          </div>
        </div>

        <div>自我介紹</div>
        <div className="flex items-center">
          <Image src={female} alt="" width={20} height={20} />
          <div>地區</div>
        </div>

        <div className="flex items-center gap-5">
          <div className="text-center">
            <p className="text-[20px]">7</p>
            <p>關注</p>
          </div>

          <div className="text-center">
            <p className="text-[20px]">0</p>
            <p>粉絲</p>
          </div>

          <div className="text-center">
            <p className="text-[20px]">1</p>
            <p>文章總數</p>
          </div>
        </div>
        <div className="flex gap-5">
          <div>編輯個人資料</div>
          <div>分享</div>
        </div>

        <div className="w-[80vw]">發送訊息</div>
      </div>
      <div className="flex gap-5">
        <div>筆記</div>
        <div>收藏</div>
        <div>按讚</div>
      </div>
      <div>
        {/* <Image src={"/"} alt="" width={1} height={1} /> */}
        <div>文章標題</div>
      </div>

      <Nav />
    </div>
  );
}

export default User;
