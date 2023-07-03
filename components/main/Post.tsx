import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PostType } from "@/utils/type";

const Post = ({ posts }: { posts: PostType[] }) => {
  // console.log(posts[0].data.createTime);

  return (
    <div className="gap columns-2">
      {posts.map((post) => (
        <div key={post.postID} className="border border-gray-300">
          <Link href={`/${post.postID}`}>
            {post.data.picture[0] ? (
              <Image
                src={`${post.data.picture[0]}`}
                alt=""
                width={200}
                height={200}
              />
            ) : (
              <div className="w-[100%] h-[200px] bg-slate-100">
                <p className="">尚未增加圖片</p>
              </div>
            )}

            {post.data.title ? (
              <div>{post.data.title}</div>
            ) : (
              <div>尚未填入標題</div>
            )}

            <div className="flex gap-2">
              <div>{post.data.createTime.slice(0, 10)}</div>
            </div>
            <div className="flex gap-2">
              <div>按讚數</div>
              <div>{post.data.loveUser ? post.data.loveUser.length : 0}</div>
            </div>
            <div className="flex gap-2">
              <div>收藏數</div>
              <div>{post.data?.keepUser ? post.data.loveUser.length : 0}</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Post;
