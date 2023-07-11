import { useEffect, useState, Suspense, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import userIcon from "@/public/create-post/user.png";

interface TagUserProps {
  uid: string;
  tagUsers: string[];
  setTagUsers: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagUser: React.FC<TagUserProps> = ({ uid, tagUsers, setTagUsers }) => {
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [users, setUsers] = useState<string[] | []>([]);

  useEffect(() => {
    axios
      .get("/api/user-data", {
        headers: {
          Authorization: `Bearer ${uid}`, //記得回來改uid喔！
        },
      })
      .then((response) => {
        if (response.data.follower || response.data.following) {
          const interactedUsers = [
            ...response.data.follower,
            ...response.data.following,
          ];
          const filteredUser = interactedUsers.filter((value, index) => {
            return interactedUsers.indexOf(value) === index;
          });
          setUsers(filteredUser);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [uid]);

  return (
    <div className="w-[100px]">
      <div
        onClick={() => setIsSelecting(true)}
        className="w-[77px] bg-gray-100 text-[14px] text-center mb-[10px] py-[7px] rounded-lg"
      >
        @ 使用者
      </div>
      {tagUsers.length > 0 ? (
        <div className="pl-[7px] mb-[15px]">
          {tagUsers.map((user, index) => (
            <Link href="../" key={index}>
              <p className="text-[10px]">@{user}</p>
            </Link>
          ))}
        </div>
      ) : (
        ""
      )}

      {isSelecting && (
        <div>
          {users.map((user, index) => (
            <p
              key={index}
              onClick={() => {
                setIsSelecting(false);
                setTagUsers((prev) => [...prev, user]);
              }}
            >
              {user}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagUser;
