"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useHMSActions,
  useHMSStore,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
} from "@100mslive/react-sdk";
import cancel from "@/public/live-stream/cancel.png";
import microphone from "@/public/live-stream/microphone.png";
import mute from "@/public/live-stream/mute-microphone.png";
import videoIcon from "@/public/live-stream/video.png";
import noVideo from "@/public/live-stream/no-video.png";
import switchCameraIcon from "@/public/live-stream/switch-camera.png";

const ControlBar = ({}) => {
  const router = useRouter();
  const hmsActions = useHMSActions();
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);

  const toggleAudio = async () => {
    await hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
  };
  const toggleVideo = async () => {
    await hmsActions.setLocalVideoEnabled(!isLocalVideoEnabled);
  };

  const switchCamera = async () => {
    await hmsActions.switchCamera();
  };

  const leaveRoom = () => {
    hmsActions.leave();
    router.push("/live-stream");
  };
  return (
    <div className="liveStreamControlDiv">
      <div onClick={leaveRoom} className="liveStreamControlBtn">
        <Image src={cancel} alt="camera controller" />
      </div>
      <div onClick={toggleVideo} className="liveStreamControlBtn">
        <Image
          src={isLocalVideoEnabled ? videoIcon : noVideo}
          alt="camera controller"
        />
      </div>
      <div onClick={toggleAudio} className="liveStreamControlBtn">
        <Image
          src={isLocalAudioEnabled ? microphone : mute}
          alt="camera controller"
        />
      </div>
      <div onClick={switchCamera} className="liveStreamControlBtn">
        <Image src={switchCameraIcon} alt="switch camera" />
      </div>
    </div>
  );
};

export default ControlBar;
