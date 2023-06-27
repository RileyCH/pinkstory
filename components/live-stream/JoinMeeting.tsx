import React from "react";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
  useVideo,
  selectPeers,
  selectLocalPeerID,
  // getAuthTokenByRoomCode,
} from "@100mslive/react-sdk";
import { hmsActions, hmsNotifications, hmsStats, hmsStore } from "@/utils/hms";

const JoinMeeting = () => {
  const peers = useHMSStore(selectPeers);
  const hmsActions = useHMSActions();
  const localPeerId = useHMSStore(selectLocalPeerID);
  const { videoRef } = useVideo({
    trackId: peers[0]?.videoTrack,
  });
  // const authToken = hmsActions.getAuthTokenByRoomCode({
  //   roomCode: "pxr-ywym-mwx",
  // });
  //   const { videoRef } = useVideo({
  //     trackId: peers.videoTrack,
  //   });
  console.log(123, peers);
  console.log("localPeerId", localPeerId);
  console.log("videoRef", videoRef);

  const config = {
    userName: "it's riley",
    authToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoyLCJ0eXBlIjoiYXBwIiwiYXBwX2RhdGEiOm51bGwsImFjY2Vzc19rZXkiOiI2NDhmMzc1OTkxYzAyM2I0ZTJkNzY3OGMiLCJyb2xlIjoiaG9zdCIsInJvb21faWQiOiI2NDkwMjg0YjA2Y2I0OTU2NDIxNzY0M2MiLCJ1c2VyX2lkIjoiOTU0M2Q2MjktZDRhMy00NGJjLThmYjMtOTY5YzNjMDkxMTk2IiwiZXhwIjoxNjg3ODczNjg4LCJqdGkiOiI5NGFlZmY1Yi01NzFmLTQzNmItODI3MS03NzE4NDlmZjY2MWMiLCJpYXQiOjE2ODc3ODcyODgsImlzcyI6IjY0OGFhMzA3OTFjMDIzYjRlMmQ3NjZjOSIsIm5iZiI6MTY4Nzc4NzI4OCwic3ViIjoiYXBpIn0.oZS1SMDWaKdiMcTfHEQ8be9IVghhPDYThQjhHdJp3fY",
    settings: {
      isAudioMuted: true,
      isVideoMuted: false,
    },
    metaData: JSON.stringify({ city: "Winterfell", knowledge: "nothing" }),
    rememberDeviceSelection: true, // remember manual device change
  };

  const onJoinClick = async () => {
    await hmsActions.join(config);
  };
  function ConnectionState() {
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    if (isConnected) {
      console.log("connected");
    } else {
      console.log("not connected, please join.");
    }
  }
  const leaveRoom = () => {
    hmsActions.leave();
  };
  return (
    <div className="relative">
      <video
        ref={videoRef}
        autoPlay
        muted
        // playsInline
        className="h-[100vh] border border-black -scale-x-100"
      ></video>
      {/* <video autoPlay muted playsInline className="w-[400px] h-[250px]" /> */}
      <p onClick={onJoinClick} className="absolute top-0">
        開啟直播
      </p>
      <p onClick={leaveRoom} className="absolute top-20">
        結束直播
      </p>
    </div>
  );
};

export default JoinMeeting;
