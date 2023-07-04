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
    // unsubscribe();
  }, [postId, authorId]);

  return (
    <div>
      <div>共 {commentData.length} 則留言</div>
      <div>
        {commentData.length > 0 ? (
          commentData.map((comment: CommentsType, index: number) => (
            <div key={index} className="flex justify-between">
              <div className="flex">
                <div>
                  <Image src={profile} alt="" width={25} height={25} />
                </div>
                <div>
                  <p>{comment?.data?.uid}</p>
                  <p>{comment?.data?.content}</p>
                  <p>
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
              >
                <Image
                  src={
                    loveComment.includes(`${comment.postId}`)
                      ? heartClick
                      : heart
                  }
                  alt=""
                  width={15}
                  height={15}
                />
                <p>{comment?.data?.loveUser.length}</p>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>

      <p> - 沒有其他留言了 - </p>
    </div>
  );
};

export default Comments;
