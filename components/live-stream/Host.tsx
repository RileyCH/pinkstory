"use client";
import { useState, useEffect } from "react";
import {
  useHMSStore,
  useHMSActions,
  selectIsConnectedToRoom,
} from "@100mslive/react-sdk";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import PreviewRoom from "./PreviewRoom";
import BackDiv from "@/components/BackDiv";
import HostRoom from "./HostRoom";

const Host = () => {
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
