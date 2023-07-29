"use client";
import { useHMSStore, useVideo, selectPeers } from "@100mslive/react-sdk";

import ControlBar from "@/components/live-stream/ControlBar";
import Viewers from "@/components/live-stream/Viewers";
import Message from "@/components/live-stream/Message";

const HostRoom = () => {
  const peers = useHMSStore(selectPeers);
  const hostVideoTrack = peers.filter((peer) => peer.roleName === "host");
  const { videoRef } = useVideo({
    trackId: hostVideoTrack[0]?.videoTrack,
  });

  return (
    <div className="relative after:bg-themePink-200 after:w-[100vw] after:h-[100vh] after:absolute after:opacity-10 after:top-0">
      <div>
        <video
          ref={videoRef}
          autoPlay
          className="w-[100vw] h-[100vh] object-cover -scale-x-100"
        ></video>
        <ControlBar />
      </div>

      <div className="absolute top-10 left-2 flex gap-3">
        <Viewers />
        <Message />
      </div>
    </div>
  );
};

export default HostRoom;
