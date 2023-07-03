"use client";
import { useState } from "react";
import Image from "next/image";
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
    <div className="w-[100vw] flex justify-around gap-3 fixed bottom-0 p-[10px] bg-white">
      <form action="" onSubmit={handleComment}>
        <input
          type="text"
          onChange={(e) => setComment(e.target.value)}
          className="border border-spacing-2"
        />
        <button type="submit">留言</button>
      </form>

      <Image
        src={love ? heartClick : heart}
        onClick={() => setLove((prev) => !prev)}
        alt="love this post"
        width={20}
        height={20}
      />
      <Image
        src={kept ? keepClick : keep}
        onClick={() => setKept((prev) => !prev)}
        alt="keep this post"
        width={20}
        height={20}
      />
    </div>
  );
};

export default AddComment;
