import { useEffect, useState, Suspense, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { fetchData } from "@/redux/features/userDataSlice";
import { UserDataType } from "@/utils/type";
import profile from "@/public/main/profile.png";

interface TagUserProps {
  uid: string;
  tagUsers: string[] | [];
  setTagUsers: any;
}

const TagUser: React.FC<TagUserProps> = ({ uid, tagUsers, setTagUsers }) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.fetchUser);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [interactiveUser, setInteractiveUser] = useState<string[] | []>([]);
  const [interactiveUserData, setInteractiveUserData] = useState<
    UserDataType[]
  >([]);
  const [selectUser, setSelectUser] = useState<UserDataType[] | []>([]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      const interactedUsers = [...userData.follower, ...userData.following];
      const filteredUser = interactedUsers.filter((value, index) => {
        return interactedUsers.indexOf(value) === index;
      });
      setInteractiveUser(filteredUser);
    }
  }, [userData]);

  useEffect(() => {
    const fetchInteractiveUserData = async (id: string) => {
      if (id) {
        await axios
          .get("/api/user-data", {
            headers: {
              Authorization: `Bearer ${id}`,
            },
          })
          .then((res) => {
            setInteractiveUserData((prev) => [...prev, res.data]);
          });
      }
    };
    interactiveUser.map((user) => {
      fetchInteractiveUserData(user);
    });
  }, [interactiveUser]);

  useEffect(() => {
    const selectUserId = selectUser.map((user) => user.uid);
    setTagUsers(selectUserId);
  }, [selectUser, setTagUsers]);

  return (
    <div className="w-[90vw] mx-auto">
      {selectUser.length > 0 ? (
        <div className="mb-[15px] flex items-center gap-2 flex-wrap">
          {selectUser.map((user, index) => (
            <div
              key={index}
              className="bg-themePink-50 rounded-lg cursor-pointer py-1 pl-2 pr-4 flex items-center gap-2 relative"
            >
              <p className="text-[10px] text-themePink-400">@ {user.name}</p>
              <p
                className="w-[18px] h-[18px] text-[5px] text-center text-themeGray-400 absolute -right-1 -top-1 rounded-full bg-themeGray-300 bg-opacity-40"
                onClick={() =>
                  setSelectUser((prev) =>
                    prev.filter((user, indexA) => indexA !== index)
                  )
                }
              >
                X
              </p>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}

      <div className="w-[70px] text-[12px] text-center mb-[10px] py-[7px] border border-themeGray-200 rounded-lg hover:border-themePink-400 cursor-pointer relative">
        <p
          onClick={() => {
            setIsSelecting((prev) => !prev);
          }}
        >
          @ 使用者
        </p>

        {isSelecting ? (
          <div className="w-[90vw] absolute top-[35px] bg-white border border-themeGray-200 rounded-lg z-10 drop-shadow max-h-[150px] overflow-auto no-scrollbar">
            {interactiveUserData.map((user, index) => (
              <div
                key={index}
                className="flex items-center gap-2 cursor-pointer hover:bg-themePink-50 border-b px-3 py-2 last:border-none"
                onClick={() => {
                  setSelectUser((prev) => [...prev, user]);
                  setIsSelecting(false);
                }}
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
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default TagUser;
