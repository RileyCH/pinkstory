import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
  useVideo,
  selectPeers,
  selectLocalPeerID,
  // getAuthTokenByRoomCode,
} from "@100mslive/react-sdk";

const Host = () => {
  const peers = useHMSStore(selectPeers);
  const hostVideoTrack = peers.filter((peer) => peer.roleName === "host");
  const hmsActions = useHMSActions();
  const { videoRef } = useVideo({
    trackId: hostVideoTrack[0]?.videoTrack,
  });
  //for meeting room join
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

  //click to join meeting room
  const onJoinClick = async () => {
    await hmsActions.join(config);
  };

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
      <div className="absolute top-2 left-2 flex gap-3">
        <p onClick={onJoinClick} className="bg-slate-200 p-[15px]">
          開啟直播
        </p>
        <p onClick={leaveRoom} className="bg-slate-200 p-[15px]">
          結束直播
        </p>
      </div>
    </div>
  );
};

export default Host;

// const authToken = hmsActions.getAuthTokenByRoomCode({
//   roomCode: "pxr-ywym-mwx",
// });
