import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import profile from "@/public/main/profile.png";
import { UserDataType } from "@/utils/type";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostAuthor = ({ authorId }: { authorId: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authorData, setAuthorData] = useState<UserDataType>({
    uid: "",
    age: 0,
    bgImg: "",
    birth: {
      date: 0,
      month: 0,
      year: 0,
    },
    constellations: "",
    follower: [],
    following: [],
    followingCategory: {},
    gender: "Female",
    introduction: "",
    keptPost: [],
    liveStream: {
      roomId: "",
      hostRoomCode: "",
      guestRoomCode: "",
    },
    name: "",
    profileImg: "",
    registedDate: 0,
    thumbnailedPost: [],
  });

  useEffect(() => {
    setIsLoading(true);
    const getAuthorName = async (id: string) => {
      await axios
        .get("/api/user-data", {
          headers: {
            Authorization: `Bearer ${id}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setAuthorData(res.data);
            setIsLoading(false);
          }
        });
    };
    getAuthorName(authorId);
  }, [authorId]);

  return (
    <div className="flex gap-2 items-center md:gap-3">
      <div className="w-[15px] h-[15px] relative md:w-[20px] md:h-[20px] lg:w-[24px] lg:h-[24px]">
        {isLoading ? (
          <Skeleton circle={true} width="120%" height="120%" />
        ) : (
          <Image
            src={authorData.profileImg ? authorData.profileImg : profile}
            alt="post author profile image"
            fill
            className="rounded-full object-cover"
            sizes="100%"
          />
        )}
      </div>
      {isLoading ? (
        <div className="w-[30px] h-[10px] xl:h-[15px]">
          <Skeleton circle={false} width="100%" height="100%" />
        </div>
      ) : (
        <p className="text-[12px] text-darkPink md:text-[14px]">
          {authorData.name}
        </p>
      )}
    </div>
  );
};

export default PostAuthor;
