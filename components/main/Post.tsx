import Link from "next/link";
import Image from "next/image";
import { PostType, UserDataType } from "@/utils/type";
import heartClick from "@/public/post/heart-click.png";
import profile from "@/public/main/profile.png";

const Post = ({
  posts,
  userName,
  profileImg,
  otherUser,
  isOtherUserPage,
}: {
  posts: PostType[];
  userName: string;
  profileImg: string | null;
  otherUser: UserDataType;
  isOtherUserPage: boolean;
}) => {
  posts.sort((a, b) => b.data.createTime.seconds - a.data.createTime.seconds);

  return (
    <div className="w-[95vw] mx-auto flex flex-wrap justify-between min-h-[150px] md:max-w-[1200px] md:justify-start md:gap-3 xl:gap-4 2xl:min-h-[200px] 2xl:max-w-[1600px]">
      {posts.length === 0 ? (
        <div className="w-[100%] min-h-[35vh] flex flex-col">
          <p className="text-center mt-[30px] mb-5 text-[14px] xl:text-[16px] xl:mt-[50px]">
            目前還沒有貼文喔～快去新增吧！
          </p>
          <Link
            href="/create-post"
            className="px-3 py-2 mx-auto bg-themePink-400 rounded text-white hover:bg-themePink-600 text-[14px]"
          >
            發佈貼文
          </Link>
        </div>
      ) : (
        posts.map((post) => (
          <div
            key={post.postID}
            className="w-[calc(50%_-_4px)] my-1 rounded-lg shadow-lg cursor-pointer relative md:w-[calc(25%_-_15px)] xl:w-[calc(20%_-_15px)] 2xl:w-[calc(20%_-_15px)]"
          >
            <Link href={`/${post.postID}`}>
              {post.data?.picture?.[0] ? (
                <div className="w-[100%] h-[170px] relative md:h-[250px] xl:h-[250px] 2xl:h-[320px]">
                  <Image
                    src={`${post.data.picture?.[0]}`}
                    alt="main post image"
                    fill
                    sizes="100%"
                    className="object-cover object-center rounded-t-lg"
                  />
                </div>
              ) : (
                <div className="w-[100%] h-[200px] bg-slate-100">
                  <p className="">尚未增加圖片</p>
                </div>
              )}
              <div className="px-[10px] pt-[7px] pb-[35px]">
                <p className="font-medium break-words mb-[5px] md:mb-[10px] 2xl:text-[18px]">
                  {post.data.title ? post.data.title : "尚未填入標題"}
                </p>

                <div className="w-[85%] flex items-center justify-between absolute bottom-3 md:w-[88%]">
                  <div className="flex gap-2">
                    <div className="w-[15px] h-[15px] relative md:w-[20px] md:h-[20px] lg:w-[24px] lg:h-[24px]">
                      {!isOtherUserPage ? (
                        <Image
                          src={profileImg ? profileImg : profile}
                          alt="post author profile image"
                          fill
                          className="rounded-full object-cover"
                          sizes="100%"
                        />
                      ) : (
                        <Image
                          src={
                            otherUser.profileImg
                              ? otherUser.profileImg
                              : profile
                          }
                          alt="post author profile image"
                          fill
                          className="rounded-full object-cover"
                          sizes="100%"
                        />
                      )}
                    </div>

                    <p className="text-[12px] text-darkPink break-words max-w-[90px] md:text-[14px]">
                      {!isOtherUserPage ? userName : otherUser.name}
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
        ))
      )}
    </div>
  );
};

export default Post;
