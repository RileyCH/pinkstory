"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/database";
import { UserDataType } from "@/utils/type";
import LoadingAnimation from "@/components/LoadingAnimation";
import heart from "@/public/post/heart.png";
import keep from "@/public/post/keep.png";
import heartClick from "@/public/post/heart-click.png";
import keepClick from "@/public/post/keep-click.png";

const KeepAndLove = ({
  postId,
  authorId,
}: {
  postId: string;
  authorId: string;
}) => {
  const userStatue = useAppSelector((state) => state.user);
  const userData = useAppSelector((state) => state.fetchUser) as UserDataType;
  const [love, setLove] = useState<boolean>(false);
  const [loveNumber, setLoveNumber] = useState<number>(0);
  const [kept, setKept] = useState<boolean>(false);
  const [keepNumber, setKeepNumber] = useState<number>(0);
  const [loveLoading, setLoveLoading] = useState<boolean>(false);
  const [keepLoading, setKeepLoading] = useState<boolean>(false);

  const handleAction = (actionName: string) => {
    if (userStatue.loginStatus) {
      if (actionName === "love") {
        setLoveLoading(true);
      } else if (actionName === "keep") {
        setKeepLoading(true);
      }

      axios
        .post("/api/post/keep-love", {
          keepLoveDetail: {
            uid: userData.uid,
            authorUid: authorId,
            postId: postId,
            action: actionName,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            if (actionName === "love") {
              setLoveLoading(false);
            } else if (actionName === "keep") {
              setKeepLoading(false);
            }
          }
        });
    } else {
      window.alert("您目前尚未登入");
    }
  };

  useEffect(() => {
    if (userStatue.loginStatus) {
      const checkLoveAndKeepNumber = () => {
        const postDoc = doc(db, "users", authorId, "posts", postId);
        const onSnapShopPostDoc = onSnapshot(postDoc, (doc) => {
          const postData = doc.data();
          if (postData) {
            const loveUsers = postData.loveUser;
            const keepUsers = postData.keepUser;

            if (loveUsers.includes(userStatue.uid)) {
              setLove(true);
            } else {
              setLove(false);
            }
            if (keepUsers.includes(userStatue.uid)) {
              setKept(true);
            } else {
              setKept(false);
            }
            setLoveNumber(postData.loveUser.length);
            setKeepNumber(postData.keepUser.length);
          }
        });
        return () => {
          onSnapShopPostDoc();
        };
      };
      checkLoveAndKeepNumber();
    }
  }, [authorId, postId, userStatue.uid, userStatue.loginStatus]);

  return (
    <div className="flex gap-4 mb-[30px] relative after:absolute after:w-[90vw] after:left-0 after:right-0 after:-bottom-[16px] after:mx-auto after:border-b after:border-themeGray-100 md:after:w-[100%]">
      {loveLoading ? (
        <LoadingAnimation />
      ) : (
        <div
          className="flex gap-[5px] items-center cursor-pointer"
          onClick={() => {
            handleAction("love");
          }}
        >
          <div className="w-[16px] h-[16px] relative">
            <Image
              src={love ? heartClick : heart}
              alt="click to love this post"
              fill
              sizes="100%"
            />
          </div>

          <p className="text-[14px] text-themeGray-600">{loveNumber}</p>
        </div>
      )}

      {keepLoading ? (
        <LoadingAnimation />
      ) : (
        <div
          className="flex gap-[5px] items-center cursor-pointer"
          onClick={() => {
            handleAction("keep");
          }}
        >
          <div className="w-[16px] h-[16px] relative">
            <Image
              src={kept ? keepClick : keep}
              alt="click to keep this post"
              fill
              sizes="100%"
            />
          </div>
          <p className="text-[14px] text-themeGray-600">{keepNumber}</p>
        </div>
      )}
    </div>
  );
};

export default KeepAndLove;
