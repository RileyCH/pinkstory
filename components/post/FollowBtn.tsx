"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchData } from "@/redux/features/userDataSlice";
import axios from "axios";
import { UserDataType } from "@/utils/type";

const FollowBtn = ({ postUid }: { postUid: string }) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.fetchUser) as UserDataType;
  const [authorCheck, setAuthorCheck] = useState(true);
  const [followStatus, setFollowStatus] = useState(false);

  const clickFollowBtn = () => {
    axios
      .post("/api/user-data/follow", {
        followingDetail: {
          uid: userData.uid,
          followingUid: postUid,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.status);
          setFollowStatus((prev) => !prev);
        }
      });
  };

  useEffect(() => {
    dispatch(fetchData());
    if (userData.uid !== postUid) {
      setAuthorCheck(false);
    }
  }, [dispatch, userData.uid, postUid]);

  useEffect(() => {
    if (userData) {
      const checkFollowing = userData.following.filter((id) => id === postUid);
      if (checkFollowing.length > 0) {
        setFollowStatus(true);
      }
    }
  }, [userData, postUid]);

  return (
    <>
      {!authorCheck && !followStatus ? (
        <div
          className="bg-themePink-400 text-white py-1 px-2 rounded text-[12px] hover:bg-themePink-500 cursor-pointer md:text-[14px]"
          onClick={() => clickFollowBtn()}
        >
          追蹤
        </div>
      ) : !authorCheck && followStatus ? (
        <div
          className="bg-themePink-600 text-white py-1 px-2 rounded text-[12px] hover:bg-themePink-700 cursor-pointer md:text-[14px]"
          onClick={() => clickFollowBtn()}
        >
          追蹤中
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default FollowBtn;
