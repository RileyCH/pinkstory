"use client";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import { hmsStore, hmsActions, hmsNotifications } from "@/utils/hms";
import Guest from "@/components/live-stream/Guest";
import Nav from "@/components/Nav";

const StartStreaming = ({ params }: { params: { roomid: string } }) => {
  return (
    <HMSRoomProvider
      actions={hmsActions}
      store={hmsStore}
      notifications={hmsNotifications}
    >
      <div>
        <Guest />
        <Nav />
      </div>
    </HMSRoomProvider>
  );
};

export default StartStreaming;
