"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchData } from "@/redux/features/userDataSlice";
import axios from "axios";
import { UserDataType } from "@/utils/type";
import LoadingAnimation from "@/components/LoadingAnimation";

const FollowBtn = ({ postUid }: { postUid: string }) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.fetchUser) as UserDataType;
  const [authorCheck, setAuthorCheck] = useState(true);
  const [followStatus, setFollowStatus] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const clickFollowBtn = () => {
    setLoading(true);
    axios
      .post("/api/user-data/follow", {
        followingDetail: {
          uid: userData.uid,
          followingUid: postUid,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setFollowStatus((prev) => !prev);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    dispatch(fetchData());
    if (userData.uid !== postUid) {
      setAuthorCheck(false);
      setLoading(false);
    }
  }, [dispatch, userData.uid, postUid]);

  useEffect(() => {
    if (userData) {
      const checkFollowing = userData.following.filter((id) => id === postUid);
      if (checkFollowing.length > 0) {
        setFollowStatus(true);
        setLoading(false);
      }
    }
  }, [userData, postUid]);

  return (
    <>
      {!authorCheck && !followStatus ? (
        <div
          className="bg-themePink-400 text-white py-1 px-2 rounded text-[12px] hover:bg-themePink-500 cursor-pointer md:text-[14px]"
          onClick={() => {
            clickFollowBtn();
          }}
        >
          {loading ? <LoadingAnimation /> : "追蹤"}
        </div>
      ) : !authorCheck && followStatus ? (
        <div
          className="bg-themePink-600 text-white py-1 px-2 rounded text-[12px] hover:bg-themePink-700 cursor-pointer md:text-[14px]"
          onClick={() => clickFollowBtn()}
        >
          {loading ? <LoadingAnimation /> : "追蹤中"}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default FollowBtn;
