"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/database";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchData } from "@/redux/features/userDataSlice";
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
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.fetchUser) as UserDataType;
  const [love, setLove] = useState<boolean>(false);
  const [loveUserNum, setLoveUserNum] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const loveComment = () => {
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
          setLove((prev) => !prev);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    const checkLoveStatus = async () => {
      const commentDoc = doc(
        db,
        "users",
        authorId,
        "posts",
        postId,
        "comments",
        commentId
      );
      const getCommentDoc = await getDoc(commentDoc);
      if (getCommentDoc.exists()) {
        const loveUsers = getCommentDoc.data().loveUser;

        if (loveUsers.includes(userData.uid)) {
          setLove(true);
        }

        setLoveUserNum(loveUsers.length);
      }
    };
    checkLoveStatus();
  }, [authorId, postId, userData.uid, commentId]);

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
          setLoveUserNum(commentData.loveUser.length);
        }
      });
    };
    checkLoveAndKeepNumber();
  }, [authorId, postId, commentId]);

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
