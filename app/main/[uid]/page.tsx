"use client";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import axios from "axios";
import { UserDataType, PostType } from "@/utils/type";
import { useRouter } from "next/navigation";
import PersonPostSkeleton from "@/components/skeleton/PersonPostSkeleton";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import PersonalArea from "@/components/main/PersonalArea";
import Keep from "@/components/main/Keep";
import Love from "@/components/main/Love";
import Stock from "@/components/main/stock/Stock";
import postIcon from "@/public/main/post.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Post = dynamic(() => import("@/components/main/Post"), {
  loading: () => <PersonPostSkeleton />,
});

type Clicked = "Post" | "Keep" | "Love" | "Stock";

function User({ params }: { params: { uid: string } }) {
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
  const [postLoading, setPostLoading] = useState(false);
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("uid");
    router.push(`/`);
  };

  useEffect(() => {
    const localStorageUid = localStorage.getItem("uid");
    setPostLoading(true);
    if (localStorageUid) {
      setLocalUid(localStorageUid);
    }
  }, []);

  useEffect(() => {
    if (params.uid) {
      const fetchUserData = async () => {
        setPostLoading(true);
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
        setPostLoading(true);
        await axios
          .get("/api/user-data/post", {
            headers: { Authorization: `Bearer ${params.uid}` },
          })
          .then((res) => {
            if (res.status === 200) {
              setPosts(res.data);
              setPostLoading(false);
            }
          });
      };
      fetchUserData();
      fetchPost();
    }
  }, [params.uid]);

  return (
    <div className="pb-[60px] md:pb-0">
      <Header />
      <main>
        <PersonalArea
          userData={userData}
          localUid={localUid}
          paramsId={params.uid}
          posts={posts}
        />

        <div className="w-[95vw] max-w-[1200px] mx-auto mb-[12px] flex gap-7 justify-center md:mb-[15px] md:gap-10 xl:gap-16">
          <p
            className={`text-[14px] md:text-[16px] cursor-pointer hover:text-themePink-400 hover:font-semibold ${
              click === "Post"
                ? "font-bold text-themePink-400 relative after:absolute after:w-[100%] after:border after:border-themePink-400 after:-bottom-3 after:right-0 md:after:-bottom-[15px]"
                : "text-themePink-900"
            }`}
            onClick={() => setClick("Post")}
          >
            貼文
          </p>
          {localUid === params.uid && (
            <>
              <p
                className={`text-[14px] md:text-[16px] cursor-pointer hover:text-themePink-400 hover:font-semibold ${
                  click === "Keep"
                    ? "font-bold text-themePink-400 relative after:absolute after:w-[100%] after:border after:border-themePink-400 after:-bottom-3 after:right-0 md:after:-bottom-[15px]"
                    : "text-themePink-900"
                }`}
                onClick={() => setClick("Keep")}
              >
                收藏
              </p>
              <p
                className={`text-[14px] md:text-[16px] cursor-pointer hover:text-themePink-400 hover:font-semibold ${
                  click === "Love"
                    ? "font-bold text-themePink-400 relative after:absolute after:w-[100%] after:border after:border-themePink-400 after:-bottom-3 after:right-0 md:after:-bottom-[15px]"
                    : "text-themePink-900"
                }`}
                onClick={() => setClick("Love")}
              >
                按讚
              </p>
              <p
                className={`text-[14px] md:text-[16px] cursor-pointer hover:text-themePink-400 hover:font-semibold ${
                  click === "Stock"
                    ? "font-bold text-themePink-400 relative after:absolute after:w-[100%] after:border after:border-themePink-400 after:-bottom-3 after:right-0 md:after:-bottom-[15px]"
                    : "text-themePink-900"
                }`}
                onClick={() => setClick("Stock")}
              >
                囤貨清單
              </p>
            </>
          )}
        </div>

        <div className="bg-themeGray-50 mt-2 pt-[15px] pb-[20px] shadow-inner">
          {click === "Post" && postLoading ? (
            <PersonPostSkeleton />
          ) : click === "Post" && !postLoading ? (
            <Post
              posts={posts}
              userName={userData.name}
              profileImg={userData.profileImg}
            />
          ) : click === "Keep" ? (
            <Keep />
          ) : click === "Love" ? (
            <Love />
          ) : click === "Stock" ? (
            <Stock uid={params.uid} />
          ) : (
            ""
          )}
        </div>
      </main>

      <Nav />
    </div>
  );
}

export default User;
