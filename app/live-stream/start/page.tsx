"use client";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import { hmsActions, hmsNotifications, hmsStore } from "@/utils/hms";
import JoinMeeting from "@/components/live-stream/JoinMeeting";
import Nav from "@/components/Nav";

const StartStreaming = () => {
  return (
    <HMSRoomProvider
      actions={hmsActions}
      store={hmsStore}
      notifications={hmsNotifications}
    >
      <div>
        發起直播
        <JoinMeeting />
        <Nav />
      </div>
    </HMSRoomProvider>
  );
};

export default StartStreaming;
