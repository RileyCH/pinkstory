"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";
import Nav from "@/components/Nav";
import { UserDataType } from "@/utils/type";
import profile from "@/public/main/profile.png";
import female from "@/public/main/female.png";
import male from "@/public/main/male.png";
import plus from "@/public/create-post/plus.png";

function User({ params }: { params: { uid: string } }) {
  const user = useAppSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState<UserDataType>({
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
    followingCategory: {},
    gender: "Female",
    introduction: "",
    keptPost: [],
    liveStreamRoomID: "",
    name: "",
    profileImg: "",
    registedDate: 0,
    thumbnailedPost: [],
  });

  useEffect(() => {
    if (user.uid) {
      const fetchUserData = () => {
        axios
          .get("/api/user-data", {
            headers: { Authorization: `Bearer ${user.uid}` },
          })
          .then((res) => {
            if (res.status === 200) {
              setUserData(res.data);
            }
          });
      };

      const fetchPost = () => {
        axios
          .get("/api/user-data/post", {
            headers: { Authorization: `Bearer ${user.uid}` },
          })
          .then((res) => {
            if (res.status === 200) {
              setPosts(res.data);
            }
          });
      };
      fetchUserData();
      fetchPost();
    }
  }, [user.uid]);

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
            <p>{userData.name}</p>
            <p>{userData.uid}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Image
            src={userData.gender.toLowerCase() === "female" ? female : male}
            alt=""
            width={20}
            height={20}
          />
          <p>{userData.constellations}</p>
        </div>
        <div>{userData.introduction}</div>

        <div className="flex items-center gap-5">
          <div className="text-center">
            <p className="text-[20px]">{userData.following.length}</p>
            <p>關注</p>
          </div>

          <div className="text-center">
            <p className="text-[20px]">{userData.follower.length}</p>
            <p>粉絲</p>
          </div>

          <div className="text-center">
            <p className="text-[20px]">{posts.length}</p>
            <p>文章總數</p>
          </div>
        </div>
        <div className="flex gap-5">
          {user.uid === userData.uid ? (
            <div>編輯個人資料</div>
          ) : (
            <div>關注</div>
          )}
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
