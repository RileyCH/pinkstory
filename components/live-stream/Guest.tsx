"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import {
  useHMSActions,
  useHMSStore,
  useVideo,
  selectPeers,
} from "@100mslive/react-sdk";
import Viewers from "./Viewers";
import BackDiv from "@/components/BackDiv";
import Message from "@/components/live-stream/Message";
import axios from "axios";

const Guest = ({ roomid }: { roomid: string }) => {
  const userData = useAppSelector((state) => state.fetchUser);
  const [fetchGuestRoomCode, setFetchGuestRoomCode] = useState<string>("");
  const [guestAuthToken, setGuestAuthToken] = useState<string>("");
  const router = useRouter();

  const peers = useHMSStore(selectPeers);
  const host = peers.filter((peer) => peer.roleName === "host");
  const hostVideoTrack = peers.filter((peer) => peer.roleName === "host");
  const hmsActions = useHMSActions();

  const { videoRef } = useVideo({
    trackId: hostVideoTrack[0]?.videoTrack,
  });

  const guestConfig = {
    userName: userData.name,
    authToken: guestAuthToken,
    settings: {
      isAudioMuted: true,
      isVideoMuted: true,
    },
    metaData: JSON.stringify({
      name: userData.name,
      profile: userData.profileImg,
    }),
    rememberDeviceSelection: true,
  };

  const leaveRoom = () => {
    hmsActions.leave();
    router.push("/live-stream");
  };

  useEffect(() => {
    if (roomid) {
      const getGuestRoomCode = async () => {
        const roomCode = await axios
          .post("/api/live-stream/join-room", {
            roomId: roomid,
          })
          .then(
            (res) =>
              res.data.data.filter((data: any) => data.role === "guest")[0]
          )
          .then((res) => setFetchGuestRoomCode(res.code));
      };

      getGuestRoomCode();
    }
  }, [roomid]);

  useEffect(() => {
    if (fetchGuestRoomCode) {
      const getAuthToken = async () => {
        const token = await hmsActions.getAuthTokenByRoomCode({
          roomCode: fetchGuestRoomCode,
        });
        setGuestAuthToken(token);
      };
      getAuthToken();
    }
  }, [fetchGuestRoomCode, hmsActions]);

  useEffect(() => {
    if (guestAuthToken) {
      const onJoinClick = async () => {
        await hmsActions.join(guestConfig);
      };
      onJoinClick();
    }
  }, [guestAuthToken, guestConfig, hmsActions]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (peers.length > 0 && host.length === 0) {
        window.alert("直播已結束");
        leaveRoom();
      }
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [peers, host.length, leaveRoom]);

  return (
    <div className="relative after:bg-themePink-200 after:w-[100vw] after:h-[100vh] after:absolute after:opacity-10 after:top-0">
      {peers.length > 0 ? (
        <div>
          <video
            ref={videoRef}
            autoPlay
            className="w-[100vw] h-[100vh] object-cover -scale-x-100"
          />
          <div className="absolute top-2 left-2 flex gap-3 z-30">
            <div onClick={leaveRoom}>
              <BackDiv url={"live-stream"} />
            </div>
            <Viewers />
            <Message />
          </div>
        </div>
      ) : (
        <p className="w-[100vw] h-[100vh] text-white bg-gradient-to-tl from-[#fae8e6] from-10% via-[#F9D1BA] via-30% to-[#e48d85] to-80% flex justify-center items-center">
          畫面載入中...
        </p>
      )}
    </div>
  );
};

export default Guest;
