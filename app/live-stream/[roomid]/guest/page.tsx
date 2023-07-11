"use client";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import { hmsStore, hmsActions, hmsNotifications } from "@/utils/hms";
import Guest from "@/components/live-stream/Guest";

const StartStreaming = ({ params }: { params: { roomid: string } }) => {
  return (
    <HMSRoomProvider
      actions={hmsActions}
      store={hmsStore}
      notifications={hmsNotifications}
    >
      <div>
        <Guest roomid={params.roomid} />
      </div>
    </HMSRoomProvider>
  );
};

export default StartStreaming;
