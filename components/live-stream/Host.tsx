import { useState } from "react";
import {
  useHMSActions,
  useHMSStore,
  useVideo,
  selectPeers,
  // getAuthTokenByRoomCode,
} from "@100mslive/react-sdk";
import Viewers from "./Viewers";
import Message from "@/components/live-stream/Message";

const Host = () => {
  const peers = useHMSStore(selectPeers);
  const hostVideoTrack = peers.filter((peer) => peer.roleName === "host");
  const hmsActions = useHMSActions();
  const { videoRef } = useVideo({
    trackId: hostVideoTrack[0]?.videoTrack,
  });
  const [title, setTitle] = useState<string>("");
  const config = {
    userName: "it's riley",
    authToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoyLCJ0eXBlIjoiYXBwIiwiYXBwX2RhdGEiOm51bGwsImFjY2Vzc19rZXkiOiI2NDhmMzc1OTkxYzAyM2I0ZTJkNzY3OGMiLCJyb2xlIjoiaG9zdCIsInJvb21faWQiOiI2NDkwMjg0YjA2Y2I0OTU2NDIxNzY0M2MiLCJ1c2VyX2lkIjoiZWJkYmZmZjktNzM4Ny00M2MzLWE3OTYtM2Q3ZWE5ODk2Yjg2IiwiZXhwIjoxNjg3OTYwNTM0LCJqdGkiOiJlMjBiZmQ5Mi1kZWY5LTQ4OTUtODE5Zi1jNThiMGRiNjI1YTUiLCJpYXQiOjE2ODc4NzQxMzQsImlzcyI6IjY0OGFhMzA3OTFjMDIzYjRlMmQ3NjZjOSIsIm5iZiI6MTY4Nzg3NDEzNCwic3ViIjoiYXBpIn0.BlvUL0tTnOcaVkl0UkuLEJDswQXx1DErzz1RwKvdhlE",
    settings: {
      isAudioMuted: true,
      isVideoMuted: false,
    },
    metaData: JSON.stringify({ city: "台北市", knowledge: `${title}` }),
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
      <div>
        <label htmlFor="">
          輸入直播主題
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 w-[300px]"
          />
        </label>
      </div>
      <video
        ref={videoRef}
        autoPlay
        muted
        // playsInline
        className="h-[100vh] border border-black -scale-x-100"
      ></video>
      <div className="absolute top-10 left-2 flex gap-3">
        <p onClick={onJoinClick} className="bg-slate-200 p-[15px]">
          開啟直播
        </p>
        <p onClick={leaveRoom} className="bg-slate-200 p-[15px]">
          結束直播
        </p>
        <Viewers />
        <Message />
      </div>
    </div>
  );
};

export default Host;

// const authToken = hmsActions.getAuthTokenByRoomCode({
//   roomCode: "pxr-ywym-mwx",
// });
