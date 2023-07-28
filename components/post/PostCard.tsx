import Link from "next/link";
import Image from "next/image";
import { PostType } from "@/utils/type";
import AuthorData from "@/components/post/AuthorData";
import heartClick from "@/public/post/heart-click.png";

const PostCard = ({ posts }: { posts: PostType[] }) => {
  posts.sort((a, b) => b.data.createTime.seconds - a.data.createTime.seconds);

  return (
    <div className="w-[95vw] max-w-[1200px] mx-auto flex flex-wrap justify-between md:flex md:justify-start md:gap-3 md:w-[90vw] md:mx-auto xl:gap-4">
      {posts.map((post) => (
        <div
          key={post.postID}
          className="my-1 rounded-lg shadow-lg cursor-pointer relative"
        >
          <Link href={`/${post.postID}`}>
            {post.data?.picture?.[0] ? (
              <div className="w-[47vw] h-[170px] relative md:w-[29vw] md:h-[250px] xl:w-[20vw] xl:h-[300px]">
                <Image
                  src={`${post.data.picture?.[0]}`}
                  alt="post main image"
                  fill
                  className="object-cover object-center rounded-t-lg"
                  sizes="100%"
                />
              </div>
            ) : (
              <div className="w-[100%] h-[200px] bg-slate-100">
                <p className="">尚未增加圖片</p>
              </div>
            )}
            <div className="max-w-[47vw] px-[15px] pt-[10px] pb-[35px] md:max-w-[200px] xl:max-w-[250px]">
              <p className="font-medium break-words mb-[5px] md:mb-[10px]">
                {post.data.title ? post.data.title : "尚未填入標題"}
              </p>

              <div className="w-[85%] flex items-center justify-between absolute bottom-3 md:w-[88%]">
                <AuthorData authorId={post.data.uid} />

                <div className="flex gap-[5px] items-center cursor-pointer">
                  <div className="w-[16px] h-[16px] relative">
                    <Image
                      src={heartClick}
                      alt="click to love this post"
                      fill
                      sizes="(max-width: 768px) 20px, 50px"
                    />
                  </div>

                  <p className="text-[14px] text-themeGray-600">
                    {post.data.loveUser ? post.data.loveUser.length : 0}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
