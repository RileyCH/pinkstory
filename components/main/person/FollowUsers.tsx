import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { UserDataType } from "@/utils/type";
import FollowSkeleton from "@/components/skeleton/FollowSkeleton";
import profile from "@/public/main/profile.png";
import close from "@/public/close.png";

type CheckFollowType = React.Dispatch<React.SetStateAction<boolean>>;

const FollowUsers = ({
  user,
  isSelecting,
  checkFollow,
}: {
  user: string[];
  isSelecting: boolean;
  checkFollow: CheckFollowType;
}) => {
  const [interactiveUserData, setInteractiveUserData] = useState<
    UserDataType[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchInteractiveUserData = async (id: string) => {
      if (id) {
        setIsLoading(true);
        await axios
          .get("/api/user-data", {
            headers: {
              Authorization: `Bearer ${id}`,
            },
          })
          .then((res) => {
            setInteractiveUserData((prev) => [...prev, res.data]);
            setIsLoading(false);
          });
      }
    };
    user.map((user) => {
      fetchInteractiveUserData(user);
    });
  }, [user]);

  return (
    <div className="bg-white">
      {isSelecting ? (
        <div className="w-[60vw] pt-[40px] fixed left-0 right-0 mx-auto top-[35vh] bg-white border border-themeGray-200 rounded-lg z-30 drop-shadow max-h-[300px] min-h-[300px] overflow-auto no-scrollbar md:max-w-[500px] md:max-h-[450px] md:min-h-[450px] md:top-[25vh]">
          <div className="w-[100%] border-b border-themeGray-100 py-2 absolute top-0">
            <div
              onClick={() => checkFollow(false)}
              className="w-[12px] h-[12px] absolute right-3 top-[14px] cursor-pointer"
            >
              <Image src={close} alt="close bottom" fill sizes="100%" />
            </div>
            <p className="text-center">用戶清單</p>
          </div>

          {isLoading ? (
            <FollowSkeleton />
          ) : !isLoading && interactiveUserData.length === 0 ? (
            <p className="text-[14px] text-center mt-[100px]">
              用戶清單目前還空空如也喔～
            </p>
          ) : (
            interactiveUserData.map((user, index) => (
              <Link
                href={`/main/${user.uid}`}
                key={index}
                className="flex items-center gap-2 cursor-pointer hover:bg-themePink-50 border-b px-3 py-2 last:border-none"
              >
                <div className="w-[20px] h-[20px] relative md:w-[25px] md:h-[25px] lg:w-[30px] lg:h-[30px] ">
                  <Image
                    src={user.profileImg ? user.profileImg : profile}
                    alt="interactive user profile image"
                    fill
                    sizes="100%"
                    className="object-cover rounded-full"
                  />
                </div>
                <p className="text-[14px]">{user.name}</p>
              </Link>
            ))
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FollowUsers;
