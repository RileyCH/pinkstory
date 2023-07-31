import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import FollowBtn from "@/components/post/FollowBtn";
import { UserDataType, PostType } from "@/utils/type";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/database";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { checkUser } from "@/redux/features/loginSlice";
import FollowUsers from "@/components/main/person/FollowUsers";
import profile from "@/public/main/profile.png";
import backGroundImg from "@/public/background/person.jpeg";
import female from "@/public/main/female.png";
import male from "@/public/main/male.png";

const PersonalArea = ({
  isLogin,
  userData,
  isOtherUserPage,
  otherUser,
  uid,
  paramsId,
  posts,
}: {
  isLogin: boolean;
  userData: UserDataType;
  isOtherUserPage: boolean;
  otherUser: UserDataType;
  uid: string;
  paramsId: string;
  posts: PostType[];
}) => {
  const userStatus = useAppSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [checkFollowing, setCheckFollowing] = useState<boolean>(false);
  const [checkFollower, setCheckFollower] = useState<boolean>(false);

  const sendMessage = () => {
    if (userStatus.loginStatus) {
      router.push(`/message`);
    } else {
      window.alert("登入才能傳送訊息喔！");
    }
  };
  const logout = () => {
    signOut(auth).then(() => {
      dispatch(checkUser({ loginStatus: false, uid: "" }));
      window.alert("您已成功登出！");
      router.push(`/`);
    });
  };

  return (
    <div className="w-[100vw] mx-auto pt-[55px] relative after:w-[95vw] after:max-w-[1200px] after:border-b after:border-themeGray-100 after:absolute after:left-0 after:right-0 after:mx-auto after:bottom-[2px] md:pt-[65px] md:after:w-[90vw] md:max-w-[1200px] 2xl:max-w-[1600px] after:2xl:max-w-[1600px]">
      <div className="mb-[13px] relative">
        <div className="w-[100vw] h-[200px] opacity-90 relative md:h-[250px] max-w-[1200px] xl:h-[350px] 2xl:max-w-[1600px] 2xl:h-[400px]">
          {!isOtherUserPage && isLogin ? (
            <Image
              src={userData.bgImg ? `${userData.bgImg}` : backGroundImg}
              fill
              sizes="100%"
              alt="personal page back-ground image"
              priority={true}
              className="object-cover object-top"
            />
          ) : (
            <Image
              src={otherUser.bgImg ? `${otherUser.bgImg}` : backGroundImg}
              fill
              sizes="100%"
              alt="personal page back-ground image"
              priority={true}
              className="object-cover object-top"
            />
          )}
        </div>

        <div className="mx-[10px] -mt-[30px] flex gap-5 relative z-10 md:mx-[50px] md:-mt-[50px] xl:mx-[90px]">
          <div className="w-[80px] h-[80px] relative md:w-[120px] md:h-[120px] md:mr-3 xl:w-[170px] xl:h-[170px] xl:mr-5 2xl:w-[200px] 2xl:h-[200px] 2xl:mr-10">
            {!isOtherUserPage && isLogin ? (
              <Image
                src={userData.profileImg ? userData.profileImg : profile}
                fill
                alt="personal page back-ground image"
                sizes="100%"
                priority={true}
                className="object-cover rounded-full border-[3px] border-white shadow-md md:border-[4px] xl:border-[5px]"
              />
            ) : (
              <Image
                src={otherUser.profileImg ? otherUser.profileImg : profile}
                fill
                alt="personal page back-ground image"
                sizes="100%"
                priority={true}
                className="object-cover rounded-full border-[3px] border-white shadow-md md:border-[4px] xl:border-[5px]"
              />
            )}
          </div>

          {/* <div className="w-[20px] h-[20px] bg-themeGray-100 flex justify-center items-center rounded-full cursor-pointer absolute left-[52px] bottom-1">
              <Image src={plus} alt="profile icon" width={7} height={7} />
            </div> */}

          <div className="max-w-[calc(100%_-_110px)]">
            <div className="mt-[35px] md:mt-[60px] xl:mt-[70px]">
              <div className="flex gap-4 items-center mb-1 md:gap-5 xl:gap-6">
                {userData.name || otherUser.name ? (
                  <p className="text-[30px] font-semibold xl:text-[36px]">
                    {!isOtherUserPage && isLogin
                      ? userData.name
                      : otherUser.name}
                  </p>
                ) : (
                  <div className="w-[60px] h-[30px] md:w-[120px] md:h-[40px]">
                    <Skeleton
                      count={1}
                      width="100%"
                      height="100%"
                      circle={false}
                    />
                  </div>
                )}

                {!isOtherUserPage && isLogin ? (
                  <div className="flex gap-3">
                    {/* <p className="text-[10px] py-[2px] px-[6px] bg-themePink-400 text-white rounded cursor-pointer hover:bg-themePink-500 md:text-[12px]">
                      編輯資料
                    </p> */}
                    <p
                      onClick={() => logout()}
                      className="text-[10px] py-[2px] px-[6px] bg-themeGray-400 text-white rounded cursor-pointer hover:bg-themeGray-500 md:text-[12px]"
                    >
                      登出
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <FollowBtn postUid={paramsId} />
                    <div
                      onClick={() => sendMessage()}
                      className="text-[10px] py-[2px] px-[6px] bg-themeOrange-500 text-white rounded cursor-pointer hover:bg-themeOrange-800 md:text-[12px]"
                    >
                      發送訊息
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 mb-2">
                {userData.constellations || otherUser.constellations ? (
                  <p className="text-[14px] text-themeGray-600 xl:text-[16px]">
                    {!isOtherUserPage
                      ? userData.constellations
                      : otherUser.constellations}
                  </p>
                ) : (
                  <Skeleton
                    count={1}
                    width="40px"
                    height="20px"
                    circle={false}
                  />
                )}
                {!isOtherUserPage && isLogin ? (
                  <div className="w-[15px] h-[15px] relative">
                    {userData.gender && (
                      <Image
                        src={
                          userData.gender.toLowerCase() === "female"
                            ? female
                            : male
                        }
                        alt="gender icon"
                        fill
                        sizes="100%"
                      />
                    )}
                  </div>
                ) : (
                  <div className="w-[15px] h-[15px] relative">
                    {otherUser.gender && (
                      <Image
                        src={
                          otherUser.gender.toLowerCase() === "female"
                            ? female
                            : male
                        }
                        alt="gender icon"
                        fill
                        sizes="100%"
                      />
                    )}
                  </div>
                )}
              </div>

              <div className="w-[100%] mb-[15px] text-[14px] xl:text-[18px] xl:mb-[20px]">
                {userData.introduction || otherUser.introduction ? (
                  <p className="max-w-[100%] break-words">
                    {!isOtherUserPage && isLogin
                      ? userData.introduction
                      : otherUser.introduction}
                  </p>
                ) : (
                  <div className="w-[60vw] h-[20px] md:w-[50vw]">
                    <Skeleton
                      count={1}
                      width="100%"
                      height="100%"
                      circle={false}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="w-[60vw] px-1 mb-[15px] flex justify-between items-center gap-5 md:w-[40vw] md:justify-start md:gap-10 xl:gap-[55px] md:mb-[20px] xl:mb-[30px]">
              <div>
                <div
                  onClick={() => setCheckFollowing(true)}
                  className="text-center cursor-pointer relative md:flex md:items-center md:gap-1"
                >
                  <p className="text-[18px] text-themePink-500 font-medium xl:text-[24px]">
                    {!isOtherUserPage && isLogin
                      ? userData.following.length
                      : otherUser.following.length}
                  </p>
                  <p className="text-[14px] text-themeGray-700 xl:text-[16px]">
                    關注
                  </p>
                </div>

                {checkFollowing && (
                  <FollowUsers
                    user={
                      isOtherUserPage ? otherUser.following : userData.following
                    }
                    isSelecting={checkFollowing}
                    checkFollow={setCheckFollowing}
                  />
                )}
              </div>

              <div>
                <div
                  onClick={() => setCheckFollower(true)}
                  className="text-center cursor-pointer relative md:flex md:items-center md:gap-1"
                >
                  <p className="text-[18px] text-themePink-500 font-medium xl:text-[24px]">
                    {!isOtherUserPage && isLogin
                      ? userData.follower.length
                      : otherUser.follower.length}
                  </p>
                  <p className="text-[14px] text-themeGray-700 xl:text-[16px]">
                    粉絲
                  </p>
                </div>

                {checkFollower && (
                  <FollowUsers
                    user={
                      isOtherUserPage ? otherUser.follower : userData.follower
                    }
                    isSelecting={checkFollower}
                    checkFollow={setCheckFollower}
                  />
                )}
              </div>

              <div className="text-center md:flex md:items-center md:gap-1">
                <p className="text-[18px] text-themePink-500 font-medium xl:text-[24px]">
                  {posts.length}
                </p>
                <p className="text-[14px] text-themeGray-700 xl:text-[16px]">
                  文章
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalArea;
