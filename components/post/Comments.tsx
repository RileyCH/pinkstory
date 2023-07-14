"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/utils/database";
import LoveComment from "@/components/post/LoveComment";
import profile from "@/public/main/profile.png";
import heart from "@/public/post/heart.png";
import heartClick from "@/public/post/heart-click.png";

interface CommentsType {
  commentId: string;
  data: {
    commentTime: Timestamp;
    content: string;
    loveUser: string[];
    uid: string;
  };
}

interface CommentsUserType {
  uid: "";
  name: "";
  profileImg: "";
}

const Comments = ({
  postId,
  authorId,
}: {
  postId: string;
  authorId: string;
}) => {
  const [commentData, setCommentData] = useState<CommentsType[]>([]);
  const [commentUser, setCommentUser] = useState<CommentsUserType[]>([]);
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
                commentId: change.doc.id,
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
              (item: CommentsType) => item.commentId !== change.doc.id
            );
          });
        }
      });
    });
  }, [postId, authorId]);
  console.log(commentData);

  useEffect(() => {
    if (commentData.length > 0) {
      const fetchCommentUserData = () => {
        commentData.map(async (comment) => {
          const userData = await axios
            .get("/api/user-data", {
              headers: {
                Authorization: `Bearer ${comment.data.uid}`,
              },
            })
            .then((res) =>
              setCommentUser((prev) => [
                ...prev,
                {
                  uid: res.data.uid,
                  name: res.data.name,
                  profileImg: res.data.profileImg,
                },
              ])
            );
        });
      };
      fetchCommentUserData();
    }
  }, [commentData]);

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
              className="w-[90vw] mx-auto my-[10px] pt-[10px] pb-[15px] px-[10px] border-b flex justify-between"
            >
              <div className="flex">
                <div className="w-[25px] h-[25px] mr-[10px] relative">
                  <Image
                    src={
                      commentUser[index]?.profileImg
                        ? commentUser[index]?.profileImg
                        : profile
                    }
                    alt="comment user profile image"
                    fill
                    sizes="(max-width: 768px) 30px, 50px"
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-[14px] font-medium">
                    {commentUser[index]?.name
                      ? commentUser[index]?.name
                      : "使用者名稱"}
                  </p>
                  <p className="text-[14px] mb-[6px]">
                    {comment?.data?.content}
                  </p>
                  <p className="text-[6px] text-themeGray-600">
                    {new Date(
                      comment?.data?.commentTime?.seconds * 1000
                    ).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* <div
                onClick={() =>
                  setLoveComment((prev) => {
                    if (prev.includes(comment.commentId)) {
                      return prev.filter((item) => item !== comment.commentId);
                    } else {
                      return [...prev, comment.commentId];
                    }
                  })
                }
                className="text-center"
              >
                <div className="w-[13px] h-[13px] relative">
                  <Image
                    src={
                      loveComment.includes(`${comment.commentId}`)
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
              </div> */}
              <LoveComment
                postId={postId}
                authorId={authorId}
                commentId={comment.commentId}
              />
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
