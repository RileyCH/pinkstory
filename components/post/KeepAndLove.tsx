"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchData } from "@/redux/features/userDataSlice";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/database";
import { UserDataType } from "@/utils/type";
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
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.fetchUser) as UserDataType;
  const [love, setLove] = useState<boolean>(false);
  const [loveNumber, setLoveNumber] = useState<number>(0);
  const [kept, setKept] = useState<boolean>(false);
  const [keepNumber, setKeepNumber] = useState<number>(0);

  const handleAction = (actionName: string) => {
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
            setLove((prev) => !prev);
          } else if (actionName === "keep") {
            setKept((prev) => !prev);
          }
        }
      });
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    const checkLoveAndKeepStatus = async () => {
      const postDoc = doc(db, "users", authorId, "posts", postId);
      const getPostDoc = await getDoc(postDoc);
      if (getPostDoc.exists()) {
        const loveUsers = getPostDoc.data().loveUser;
        const keepUsers = getPostDoc.data().keepUser;
        if (loveUsers.includes(userData.uid)) {
          setLove(true);
        }
        if (keepUsers.includes(userData.uid)) {
          setKept(true);
        }
        setLoveNumber(loveUsers.length);
        setKeepNumber(keepUsers.length);
      }
    };
    checkLoveAndKeepStatus();
  }, [authorId, postId, userData.uid]);

  useEffect(() => {
    const checkLoveAndKeepNumber = () => {
      const postDoc = doc(db, "users", authorId, "posts", postId);
      const onSnapShopPostDoc = onSnapshot(postDoc, (doc) => {
        const postData = doc.data();
        if (postData) {
          setLoveNumber(postData.loveUser.length);
          setKeepNumber(postData.keepUser.length);
        }
      });
    };
    checkLoveAndKeepNumber();
  }, [authorId, postId]);

  return (
    <div className="flex gap-4 mb-[20px] relative after:absolute after:w-[90vw] after:left-0 after:right-0 after:-bottom-[16px] after:mx-auto after:border-b after:border-themeGray-100 md:after:w-[100%]">
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
            sizes="(max-width: 768px) 20px, 50px"
          />
        </div>

        <p className="text-[14px] text-themeGray-600">{loveNumber}</p>
      </div>
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
            sizes="(max-width: 768px) 20px, 50px"
          />
        </div>
        <p className="text-[14px] text-themeGray-600">{keepNumber}</p>
      </div>
    </div>
  );
};

export default KeepAndLove;
