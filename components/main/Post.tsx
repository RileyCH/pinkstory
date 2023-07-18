import Link from "next/link";
import Image from "next/image";
import { PostType } from "@/utils/type";
import heartClick from "@/public/post/heart-click.png";
import profile from "@/public/main/profile.png";

const Post = ({
  posts,
  userName,
  profileImg,
}: {
  posts: PostType[];
  userName: string;
  profileImg: string | null;
}) => {
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
              <div className="w-[47vw] h-[170px] relative md:w-[29vw] md:h-[250px] xl:w-[15vw] xl:h-[250px]">
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
            <div className="max-w-[47vw] px-[15px] pt-[10px] pb-[35px] md:max-w-[200px] xl:max-w-[250px]">
              <p className="font-medium break-words mb-[5px] max-w-[170px]">
                {post.data.title ? post.data.title : "尚未填入標題"}
              </p>

              <div className="w-[85%] flex items-center justify-between absolute bottom-3 md:w-[88%]">
                <div className="flex gap-2 items-center">
                  <div className="w-[15px] h-[15px] relative md:w-[20px] md:h-[20px] lg:w-[24px] lg:h-[24px]">
                    <Image
                      src={profileImg ? profileImg : profile}
                      alt="post author profile image"
                      fill
                      className="rounded-full object-cover"
                      sizes="100%"
                    />
                  </div>

                  <p className="text-[12px] text-darkPink md:text-[14px]">
                    {userName}
                  </p>
                </div>

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

export default Post;
