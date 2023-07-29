"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/database";
import { useAppSelector } from "@/redux/hooks";
import { UserDataType } from "@/utils/type";
import heart from "@/public/post/heart.png";
import heartClick from "@/public/post/heart-click.png";
import LoadingAnimation from "@/components/LoadingAnimation";

const CommentUser = ({
  postId,
  authorId,
  commentId,
}: {
  postId: string;
  authorId: string;
  commentId: string;
}) => {
  const userStatus = useAppSelector((state) => state.user);
  const userData = useAppSelector((state) => state.fetchUser) as UserDataType;
  const [love, setLove] = useState<boolean>(false);
  const [loveUserNum, setLoveUserNum] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const loveComment = () => {
    if (userStatus.loginStatus) {
      setLoading(true);
      axios
        .post("/api/post/love-comment", {
          loveComment: {
            uid: userData.uid,
            authorUid: authorId,
            postId: postId,
            commentId: commentId,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
          }
        });
    } else {
      window.alert("您目前尚未登入");
    }
  };

  useEffect(() => {
    const checkLoveAndKeepNumber = () => {
      const commentDoc = doc(
        db,
        "users",
        authorId,
        "posts",
        postId,
        "comments",
        commentId
      );
      const onSnapShopPostDoc = onSnapshot(commentDoc, (doc) => {
        const commentData = doc.data();
        if (commentData) {
          const loveStatus = commentData.loveUser;
          if (loveStatus.includes(userStatus.uid)) {
            setLove(true);
          } else {
            setLove(false);
          }
          setLoveUserNum(commentData.loveUser.length);
        }
      });
      return () => {
        onSnapShopPostDoc();
      };
    };
    checkLoveAndKeepNumber();
  }, [authorId, postId, commentId, userStatus.uid]);

  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div
          onClick={() => loveComment()}
          className="text-center cursor-pointer"
        >
          <div className="w-[13px] h-[13px] relative">
            <Image
              src={!love ? heart : heartClick}
              alt="love post comment"
              fill
              sizes="(max-width: 768px) 20px, 50px"
            />
          </div>

          <p className="text-[14px] text-themeGray-600">{loveUserNum}</p>
        </div>
      )}
    </>
  );
};

export default CommentUser;
