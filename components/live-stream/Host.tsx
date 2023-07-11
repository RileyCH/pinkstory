"use client";
import { useState, useEffect } from "react";
import {
  useHMSStore,
  useHMSActions,
  selectIsConnectedToRoom,
} from "@100mslive/react-sdk";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { fetchData } from "@/redux/features/userDataSlice";
import { useRouter } from "next/navigation";
import PreviewRoom from "./PreviewRoom";
import BackDiv from "@/components/BackDiv";
import HostRoom from "./HostRoom";

const Host = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.fetchUser);
  const [hostAuthToken, setHostAuthToken] = useState<string>("");
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const router = useRouter();

  const leaveRoom = () => {
    hmsActions.leave();
    router.push("/live-stream");
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (userData.liveStream.hostRoomCode) {
      const getAuthToken = async () => {
        const token = await hmsActions.getAuthTokenByRoomCode({
          roomCode: userData.liveStream.hostRoomCode,
        });
        setHostAuthToken(token);
      };
      getAuthToken();
    }
  }, [hmsActions, userData.liveStream.hostRoomCode]);

  return (
    <div>
      <div onClick={leaveRoom}>
        <BackDiv url={"live-stream"} />
      </div>

      {isConnected ? (
        <HostRoom />
      ) : (
        <PreviewRoom hostAuthToken={hostAuthToken} userData={userData} />
      )}
    </div>
  );
};

export default Host;
