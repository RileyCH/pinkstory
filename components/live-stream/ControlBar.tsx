"use client";
import React from "react";
import Image from "next/image";
import {
  useHMSActions,
  useHMSStore,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
} from "@100mslive/react-sdk";
import microphone from "@/public/live-stream/microphone.png";
import mute from "@/public/live-stream/mute-microphone.png";
import videoIcon from "@/public/live-stream/video.png";
import noVideo from "@/public/live-stream/no-video.png";
import switchCameraIcon from "@/public/live-stream/switch-camera.png";

const ControlBar = ({}) => {
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
  return (
    <div className="liveStreamControlDiv">
      <div onClick={toggleVideo} className="liveStreamControlBtn">
        <Image
          src={isLocalVideoEnabled ? noVideo : videoIcon}
          alt="camera controller"
        />
      </div>
      <div onClick={toggleAudio} className="liveStreamControlBtn">
        <Image
          src={isLocalAudioEnabled ? mute : microphone}
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