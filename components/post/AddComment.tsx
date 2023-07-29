"use client";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import axios from "axios";
import LoadingAnimation from "@/components/LoadingAnimation";

const AddComment = ({
  postId,
  authorId,
}: {
  postId: string;
  authorId: string;
}) => {
  const userStatus = useAppSelector((state) => state.user);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment === "") window.alert("請先輸入留言");
    if (userStatus.loginStatus && comment !== "") {
      setLoading(true);
      axios
        .post(
          "/api/post/add-comment",
          {
            commentDetails: {
              authorId: authorId,
              postId: postId,
              uid: userStatus.uid,
              content: comment,
            },
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .finally(() => {
          setLoading(false);
        });
      setComment("");
    }
  };

  return (
    <div className="w-[100vw] flex justify-around items-center gap-3 fixed z-10 bottom-0 px-[10px] py-[15px] bg-white shadow-[0px_-10px_10px_-15px_rgba(0,0,0,0.2)] md:w-[100%] md:shadow-none md:absolute md:bottom-0 md:py-[10px] ">
      {userStatus.loginStatus ? (
        <div className="w-[95vw] flex justify-between md:w-[100%]">
          <form
            onSubmit={handleComment}
            className="w-[95vw] flex items-center md:w-[100%]"
          >
            <input
              type="text"
              placeholder="説點什麼吧..."
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              className="w-[calc(100%_-_50px)] px-[18px] py-1 h-[35px] text-themePink-500 bg-themeGray-50 block mr-[10px] rounded-full placeholder:text-[14px]"
            />
            {loading ? (
              <LoadingAnimation />
            ) : (
              <button
                type="submit"
                className="bg-themePink-400 hover:bg-themePink-500 text-[14px] text-white px-[5px] py-[4px] rounded-lg cursor-pointer"
              >
                留言
              </button>
            )}
          </form>
        </div>
      ) : (
        <div className="text-[14px] flex items-center gap-4 md:text-[16px]">
          <p>需登入才能留言</p>
          <Link
            href="/"
            className="bg-themePink-400 hover:bg-themePink-500 text-white px-[5px] py-[2px] rounded cursor-pointer"
          >
            登入
          </Link>
        </div>
      )}
    </div>
  );
};

export default AddComment;
