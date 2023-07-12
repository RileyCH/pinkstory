"use client";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { UserDataType, PostType } from "@/utils/type";
import { useRouter } from "next/navigation";

import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Keep from "@/components/main/Keep";
import Love from "@/components/main/Love";
import profile from "@/public/main/profile.png";
import female from "@/public/main/female.png";
import male from "@/public/main/male.png";
import plus from "@/public/create-post/plus.png";
import backGroundImg from "@/public/background/person.jpeg";

const Post = React.lazy(() => import("@/components/main/Post"));
const Stock = React.lazy(() => import("@/components/main/stock/Stock"));

type Clicked = "Post" | "Keep" | "Love" | "Stock";

function User({ params }: { params: { uid: string } }) {
  const user = useAppSelector((state) => state.user);
  const [localUid, setLocalUid] = useState<string>("");
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
  const [posts, setPosts] = useState<PostType[]>([]);
  const [click, setClick] = useState<Clicked>("Post");
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("uid");
    router.push(`/`);
  };

  useEffect(() => {
    const localStorageUid = localStorage.getItem("uid");
    if (localStorageUid) {
      setLocalUid(localStorageUid);
    }
  }, []);

  useEffect(() => {
    if (params.uid) {
      const fetchUserData = async () => {
        await axios
          .get("/api/user-data", {
            headers: { Authorization: `Bearer ${params.uid}` },
          })
          .then((res) => {
            if (res.status === 200) {
              setUserData(res.data);
            }
          });
      };

      const fetchPost = async () => {
        await axios
          .get("/api/user-data/post", {
            headers: { Authorization: `Bearer ${params.uid}` },
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
  }, []);

  return (
    <div className="pb-[75px]">
      <Header />

      <div>
        <div className="max-w-[1200px] mx-auto pt-[68px] mb-3 relative after:w-[95vw] after:max-w-[1200px] after:border after:border-themeGray-50 after:absolute after:left-0 after:right-0 after:mx-auto after:bottom-2 md:pt-[100px] md:after:w-[90vw]">
          <div className="flex items-center mb-[13px] relative">
            <div className="w-[100vw] h-[150px] opacity-90 absolute -top-5 left-0 md:h-[300px] md:-top-9 max-w-[1200px]">
              <Image
                src={userData.bgImg ? `${userData.bgImg}` : backGroundImg}
                fill
                alt="personal page back-ground image"
                priority={true}
                className="object-cover object-top"
              />
            </div>

            <div className="mt-[105px] mx-[10px] flex gap-5 relative z-10 md:mt-[200px] md:mx-[50px] xl:mx-[90px]">
              <div className="w-[80px] h-[80px] relative md:w-[120px] md:h-[120px] xl:w-[170px] xl:h-[170px]">
                <Image
                  src={userData.profileImg ? `${userData.profileImg}` : profile}
                  alt="profile icon"
                  fill
                  className="object-cover rounded-full border-[3px] border-white shadow-md md:border-[4px] xl:border-[5px]"
                  priority={true}
                />
              </div>

              {/* <div className="w-[20px] h-[20px] bg-themeGray-100 flex justify-center items-center rounded-full cursor-pointer absolute left-[52px] bottom-1">
              <Image src={plus} alt="profile icon" width={7} height={7} />
            </div> */}

              <div className="max-w-[calc(100%_-_110px)]">
                <div className="mt-[25px] flex gap-4 items-center md:mt-[70px] xl:mt-[80px]">
                  <p className="text-[30px] font-semibold xl:text-[36px]">
                    {userData.name}
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="text-[14px] text-themeGray-600 mt-1 xl:text-[16px]">
                      {userData.constellations}
                    </p>

                    <div className="w-[15px] h-[15px] relative">
                      <Image
                        src={
                          userData.gender &&
                          userData.gender.toLowerCase() === "female"
                            ? female
                            : male
                        }
                        alt="gender icon"
                        fill
                      />
                    </div>
                  </div>

                  {localUid === params.uid ? (
                    <div className="flex gap-2">
                      <p
                        onClick={() => logout()}
                        className="text-[12px] py-1 px-2 bg-themePink-400 text-white rounded-lg cursor-pointer hover:bg-themePink-500"
                      >
                        編輯個人資料
                      </p>
                      <p
                        onClick={() => logout()}
                        className="text-[12px] py-1 px-2 bg-themeGray-400 text-white rounded-lg cursor-pointer hover:bg-themeGray-500"
                      >
                        登出
                      </p>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <p className="text-[12px] py-1 px-2 bg-themePink-400 text-white rounded-lg cursor-pointer hover:bg-themePink-500">
                        追蹤
                      </p>
                      <p className="text-[12px] py-1 px-2 bg-themeOrange-500 text-white rounded-lg cursor-pointer hover:bg-themeOrange-800">
                        發送訊息
                      </p>
                    </div>
                  )}
                </div>
                <div className="w-[100%] mb-[15px] text-[14px] xl:text-[16px]">
                  {userData.introduction}
                </div>

                <div className="w-[100%] px-1 mx-auto mb-[15px] flex justify-between items-center gap-5 md:justify-start md:gap-10 xl:gap-[55px] md:mb-[20px] xl:mb-[30px]">
                  <div className="text-center md:flex md:items-center md:gap-1">
                    <p className="text-[18px] text-themePink-500 font-medium xl:text-[24px]">
                      {userData.following.length}
                    </p>
                    <p className="text-[14px] text-themeGray-700 xl:text-[16px]">
                      關注
                    </p>
                  </div>

                  <div className="text-center md:flex md:items-center md:gap-1">
                    <p className="text-[18px] text-themePink-500 font-medium xl:text-[24px]">
                      {userData.follower.length}
                    </p>
                    <p className="text-[14px] text-themeGray-700 xl:text-[16px]">
                      粉絲
                    </p>
                  </div>

                  <div className="text-center md:flex md:items-center md:gap-1">
                    <p className="text-[18px] text-themePink-500 font-medium xl:text-[24px]">
                      {posts.length}
                    </p>
                    <p className="text-[14px] text-themeGray-700 xl:text-[16px]">
                      文章
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-5">
            {/* {user.uid === userData.uid ? (
            <div>編輯個人資料</div>
          ) : (
            <div>
              <div>關注</div>
              <div className="w-[80vw]">發送訊息</div>
            </div>
          )} */}
          </div>
        </div>

        <div className="w-[95vw] max-w-[1200px] mx-auto mb-[8px] flex gap-5 justify-around md:mb-[20px] xl:mb-[30px]">
          <p
            className={`text-[14px] md:text-[16px] xl:text-[18px] ${
              click === "Post"
                ? "font-bold text-themePink-400"
                : "text-themePink-900"
            }`}
            onClick={() => setClick("Post")}
          >
            筆記
          </p>
          <p
            className={`text-[14px] md:text-[16px] xl:text-[18px] ${
              click === "Keep"
                ? "font-bold text-themePink-400"
                : "text-themePink-900"
            }`}
            onClick={() => setClick("Keep")}
          >
            收藏
          </p>
          <p
            className={`text-[14px] md:text-[16px] xl:text-[18px] ${
              click === "Love"
                ? "font-bold text-themePink-400"
                : "text-themePink-900"
            }`}
            onClick={() => setClick("Love")}
          >
            按讚
          </p>
          <p
            className={`text-[14px] md:text-[16px] xl:text-[18px] ${
              click === "Stock"
                ? "font-bold text-themePink-400"
                : "text-themePink-900"
            }`}
            onClick={() => setClick("Stock")}
          >
            囤貨清單
          </p>
        </div>
        <div>
          {click === "Post" ? (
            <Suspense fallback={<div>資料讀取中...</div>}>
              <Post posts={posts} />
            </Suspense>
          ) : click === "Keep" ? (
            <Keep />
          ) : click === "Love" ? (
            <Love />
          ) : click === "Stock" ? (
            <Suspense fallback={<div>資料讀取中...</div>}>
              <Stock uid={params.uid} />
            </Suspense>
          ) : (
            ""
          )}
        </div>
      </div>

      <Nav />
    </div>
  );
}

export default User;
