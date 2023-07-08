"use client";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import { hmsActions, hmsNotifications, hmsStore } from "@/utils/hms";
import BackDiv from "@/components/BackDiv";
import Host from "@/components/live-stream/Host";

const StartStreaming = ({ params }: { params: { roomid: string } }) => {
  return (
    <HMSRoomProvider
      actions={hmsActions}
      store={hmsStore}
      notifications={hmsNotifications}
    >
      <div>
        <BackDiv url={"live-stream"} />
        <Host />
      </div>
    </HMSRoomProvider>
  );
};

export default StartStreaming;
