import Link from "next/link";
import Image from "next/image";
import { PostType } from "@/utils/type";
import profile from "@/public/main/profile.png";

const Post = ({ posts }: { posts: PostType[] }) => {
  posts.sort((a, b) => b.data.createTime.seconds - a.data.createTime.seconds);

  return (
    <div className="w-[100vw] max-w-[1200px] mx-auto flex gap-1 flex-wrap justify-center md:flex md:justify-start md:gap-3 md:w-[90vw] md:mx-auto xl:gap-4">
      {posts.map((post) => (
        <div
          key={post.postID}
          className="my-1 rounded-lg shadow-lg cursor-pointer relative"
        >
          <Link href={`/${post.postID}`}>
            {post.data?.picture?.[0] ? (
              <div className="w-[48vw] h-[170px] relative md:w-[29vw] md:h-[250px] xl:w-[20vw] xl:h-[300px]">
                <Image
                  src={`${post.data.picture?.[0]}`}
                  alt=""
                  fill
                  className="object-cover object-center rounded-t-lg"
                />
              </div>
            ) : (
              <div className="w-[100%] h-[200px] bg-slate-100">
                <p className="">尚未增加圖片</p>
              </div>
            )}
            <div className="max-w-[48vw] px-[15px] pt-[10px] pb-[35px] md:max-w-[200px] xl:max-w-[250px]">
              <p className="font-medium break-words mb-[5px]">
                {post.data.title ? post.data.title : "尚未填入標題"}
              </p>

              <div className="flex gap-2 items-center absolute bottom-3">
                <div className="w-[15px] h-[15px] relative">
                  <Image src={profile} alt="" fill />
                </div>
                <p className="text-[12px] text-darkPink">
                  {post.data.uid.slice(0, 5)}
                </p>
              </div>
              <p className="text-[10px]">
                {post.data.createTime &&
                  new Date(
                    post.data.createTime.seconds * 1000
                  ).toLocaleString()}
              </p>
              {/* <div className="flex gap-2">
              <p>按讚數</p>
              <p>{post.data.loveUser ? post.data.loveUser.length : 0}</p>
            </div>
            <div className="flex gap-2">
              <p>收藏數</p>
              <p>{post.data?.keepUser ? post.data.loveUser.length : 0}</p>
            </div> */}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Post;
