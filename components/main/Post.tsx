import Link from "next/link";
import Image from "next/image";
import { PostType } from "@/utils/type";
import profile from "@/public/main/profile.png";

const Post = ({ posts }: { posts: PostType[] }) => {
  posts.sort((a, b) => b.data.createTime.seconds - a.data.createTime.seconds);
  return (
    <div className="grid gap-2 grid-cols-2 mb-[100px]">
      {posts.map((post) => (
        <div key={post.postID} className="border border-gray-300">
          <Link href={`/${post.postID}`}>
            {post.data?.picture?.[0] ? (
              <Image
                src={`${post.data.picture?.[0]}`}
                alt=""
                width={200}
                height={200}
              />
            ) : (
              <div className="w-[100%] h-[200px] bg-slate-100">
                <p className="">尚未增加圖片</p>
              </div>
            )}

            {post.data.title ? <p>{post.data.title}</p> : <p>尚未填入標題</p>}

            <div>
              {post.data.createTime &&
                new Date(post.data.createTime.seconds * 1000).toLocaleString()}
            </div>
            <div className="flex gap-2">
              <Image src={profile} alt="" width={10} height={10} />
              <p className="text-[12px]">{post.data.uid.slice(0, 5)}</p>
            </div>

            {/* <div className="flex gap-2">
              <p>按讚數</p>
              <p>{post.data.loveUser ? post.data.loveUser.length : 0}</p>
            </div>
            <div className="flex gap-2">
              <p>收藏數</p>
              <p>{post.data?.keepUser ? post.data.loveUser.length : 0}</p>
            </div> */}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Post;
