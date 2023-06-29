import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
  useVideo,
  selectPeers,
  // getAuthTokenByRoomCode,
} from "@100mslive/react-sdk";
import Viewers from "./Viewers";
import Message from "@/components/live-stream/Message";

const Guest = () => {
  const peers = useHMSStore(selectPeers);
  const hostVideoTrack = peers.filter((peer) => peer.roleName === "host");
  const hmsActions = useHMSActions();
  const { videoRef } = useVideo({
    trackId: hostVideoTrack[0]?.videoTrack,
  });

  const config = {
    userName: "Guest",
    authToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoyLCJ0eXBlIjoiYXBwIiwiYXBwX2RhdGEiOm51bGwsImFjY2Vzc19rZXkiOiI2NDhmMzc1OTkxYzAyM2I0ZTJkNzY3OGMiLCJyb2xlIjoiZ3Vlc3QiLCJyb29tX2lkIjoiNjQ5MDI4NGIwNmNiNDk1NjQyMTc2NDNjIiwidXNlcl9pZCI6IjFiN2JkOTNhLWVlNWItNGYzZS05ODI2LWVmM2MwYTQwMjljNCIsImV4cCI6MTY4ODExMDUxNywianRpIjoiNGIxMGY5ODgtYTJkMC00ODJhLTk3YTUtZGU3NTM0OTU5OTA0IiwiaWF0IjoxNjg4MDI0MTE3LCJpc3MiOiI2NDhhYTMwNzkxYzAyM2I0ZTJkNzY2YzkiLCJuYmYiOjE2ODgwMjQxMTcsInN1YiI6ImFwaSJ9.fHfs5G4KYgV6qrJi1IKVZNimdtJJguM5gZwrsJNJGF8",
    settings: {
      isAudioMuted: true,
      isVideoMuted: true,
    },
    metaData: JSON.stringify({ city: "Winterfell", knowledge: "nothing" }),
    rememberDeviceSelection: true, // remember manual device change
  };

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
          觀看直播
        </p>
        <p onClick={leaveRoom} className="bg-slate-200 p-[15px]">
          結束觀看
        </p>
        <Viewers />
        <Message />
      </div>
    </div>
  );
};

export default Guest;

// const authToken = hmsActions.getAuthTokenByRoomCode({
//   roomCode: "pxr-ywym-mwx",
// });
