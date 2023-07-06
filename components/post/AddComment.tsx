"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";
import heart from "@/public/post/heart.png";
import heartClick from "@/public/post/heart-click.png";
import keep from "@/public/post/keep.png";
import keepClick from "@/public/post/keep-click.png";

const AddComment = ({
  postId,
  authorId,
}: {
  postId: string;
  authorId: string;
}) => {
  const user = useAppSelector((state) => state.user.uid);
  const [love, setLove] = useState<boolean>(false);
  const [kept, setKept] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post(
      "/api/post/add-comment",
      {
        commentDetails: {
          authorId: authorId,
          postId: postId,
          uid: user,
          content: comment,
        },
      },
      { headers: { "Content-Type": "application/json" } }
    );
  };
  return (
    <div className="w-[100vw] flex justify-around items-center gap-3 fixed bottom-0 p-[10px] bg-slate-100">
      {user ? (
        <div className="flex justify-between">
          <form
            action=""
            onSubmit={handleComment}
            className="w-[70vw] flex items-center"
          >
            <input
              type="text"
              onChange={(e) => setComment(e.target.value)}
              className="w-[80%] h-[30px] block border border-spacing-2 mr-[10px]"
            />
            <button
              type="submit"
              className="bg-[#FB6E6E] hover:bg-[#b62c2c] text-white px-[5px] py-[2px] rounded-sm cursor-pointer"
            >
              留言
            </button>
          </form>
          <div className="flex gap-[15px] items-center">
            <div className="w-[25px] h-[25px] relative">
              <Image
                src={love ? heartClick : heart}
                onClick={() => setLove((prev) => !prev)}
                alt="love this post"
                fill
              />
            </div>
            <div className="w-[25px] h-[25px] relative">
              <Image
                src={kept ? keepClick : keep}
                onClick={() => setKept((prev) => !prev)}
                alt="keep this post"
                fill
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 mb-[15px]">
          <p>您目前尚未登入，需登入才能留言</p>
          <Link
            href="/main"
            className="bg-[#FB6E6E] hover:bg-[#b62c2c] text-white px-[5px] py-[2px] rounded-sm cursor-pointer"
          >
            去登入
          </Link>
        </div>
      )}
    </div>
  );
};

export default AddComment;
