"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import heart from "@/public/post/heart.png";
import keep from "@/public/post/keep.png";
import message from "@/public/post/message.png";
import heartClick from "@/public/post/heart-click.png";
import keepClick from "@/public/post/keep-click.png";

const KeepAndLove = ({
  postId,
  authorId,
}: {
  postId: string;
  authorId: string;
}) => {
  const [love, setLove] = useState<boolean>(false);
  const [kept, setKept] = useState<boolean>(false);

  return (
    <div className="flex gap-3">
      <div className="flex gap-1 items-center">
        <div className="w-[20px] h-[20px] relative">
          <Image
            src={love ? heartClick : heart}
            onClick={() => setLove((prev) => !prev)}
            alt="click to love this post"
            fill
            sizes="(max-width: 768px) 20px, 50px"
          />
        </div>

        <p>0</p>
      </div>
      <div className="flex gap-1 items-center">
        <div className="w-[20px] h-[20px] relative">
          <Image
            src={kept ? keepClick : keep}
            onClick={() => setKept((prev) => !prev)}
            alt="click to keep this post"
            fill
            sizes="(max-width: 768px) 20px, 50px"
          />
        </div>
        <p>0</p>
      </div>
      <div className="flex gap-1 items-center">
        <div className="w-[20px] h-[20px] relative">
          <Image
            src={message}
            alt="numbers of comments"
            fill
            sizes="(max-width: 768px) 20px, 50px"
          />
        </div>
        <p>0</p>
      </div>
    </div>
  );
};

export default KeepAndLove;
