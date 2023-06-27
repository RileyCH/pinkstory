"use client";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import { hmsActions, hmsNotifications, hmsStore } from "@/utils/hms";
import Host from "@/components/live-stream/Host";
import Nav from "@/components/Nav";

const StartStreaming = ({ params }: { params: { roomid: string } }) => {
  return (
    <HMSRoomProvider
      actions={hmsActions}
      store={hmsStore}
      notifications={hmsNotifications}
    >
      <div>
        <Host />
        <Nav />
      </div>
    </HMSRoomProvider>
  );
};

export default StartStreaming;
