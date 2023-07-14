"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/utils/database";
import profile from "@/public/main/profile.png";
import heart from "@/public/post/heart.png";
import heartClick from "@/public/post/heart-click.png";

interface CommentsType {
  postId: string;
  data: {
    commentTime: Timestamp;
    content: string;
    loveUser: string[];
    uid: string;
  };
}

const Comments = ({
  postId,
  authorId,
}: {
  postId: string;
  authorId: string;
}) => {
  const [commentData, setCommentData] = useState<CommentsType[]>([]);
  const [loveComment, setLoveComment] = useState<string[]>([]);

  useEffect(() => {
    const postCollection = collection(
      db,
      "users",
      authorId,
      "posts",
      postId,
      "comments"
    );
    const q = query(postCollection, orderBy("commentTime"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setCommentData((prev) => {
            return [
              ...prev,
              {
                postId: change.doc.id,
                data: {
                  commentTime: change.doc.data().commentTime,
                  content: change.doc.data().content,
                  loveUser: change.doc.data().loveUser,
                  uid: change.doc.data().uid,
                },
              },
            ];
          });
        } else if (change.type === "removed") {
          setCommentData((prev: CommentsType[]) => {
            return prev.filter(
              (item: CommentsType) => item.postId !== change.doc.id
            );
          });
        }
      });
    });
  }, [postId, authorId]);

  return (
    <div>
      <p className="text-[14px] text-center text-themeGray-600 mb-[20px]">
        -- 共 {commentData.length} 則留言 --
      </p>
      <div className="mb-[20px]">
        {commentData.length > 0 ? (
          commentData.map((comment: CommentsType, index: number) => (
            <div
              key={index}
              className="w-[90vw] mx-auto my-[10px] py-[10px] px-[10px] border-b flex justify-between"
            >
              <div className="flex">
                <div className="mr-[10px]">
                  <Image src={profile} alt="" width={25} height={25} />
                </div>
                <div>
                  <p>{comment?.data?.uid.slice(0, 5)}</p>
                  <p>{comment?.data?.content}</p>
                  <p className="text-[8px]">
                    {new Date(
                      comment?.data?.commentTime?.seconds * 1000
                    ).toLocaleString()}
                  </p>
                </div>
              </div>

              <div
                onClick={() =>
                  setLoveComment((prev) => {
                    if (prev.includes(comment.postId)) {
                      return prev.filter((item) => item !== comment.postId);
                    } else {
                      return [...prev, comment.postId];
                    }
                  })
                }
                className="text-center"
              >
                <div className="w-[13px] h-[13px] relative">
                  <Image
                    src={
                      loveComment.includes(`${comment.postId}`)
                        ? heartClick
                        : heart
                    }
                    alt="love post comment"
                    fill
                    sizes="(max-width: 768px) 20px, 50px"
                  />
                </div>

                <p className="text-[14px] text-themeGray-600">
                  {comment?.data?.loveUser.length}
                </p>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>

      <p className="text-center text-[12px] text-themeGray-400">
        沒有其他留言了
      </p>
    </div>
  );
};

export default Comments;
