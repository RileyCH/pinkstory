import { useState } from "react";
import Image from "next/image";
import {
  useHMSStore,
  useCustomEvent,
  useHMSActions,
  selectHMSMessages,
  selectBroadcastMessages,
  selectMessagesByRole,
  selectMessagesByPeerID,
  selectPeers,
} from "@100mslive/react-sdk";
import { hmsActions } from "@/utils/hms";
import sendIcon from "@/public/live-stream/send.png";

const Message = () => {
  const [message, setMessage] = useState<string>("");
  //   const allMessages = useHMSStore(selectHMSMessages); // get all messages
  const broadcastMessages = useHMSStore(selectBroadcastMessages); // get all broadcasted messages
  const groupMessagesByRole = useHMSStore(selectMessagesByRole("host")); // get conversation with the host role
  const peers = useHMSStore(selectPeers);

  const sentMessage = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    hmsActions.sendBroadcastMessage(`${message}`);
  };
  console.log(message);

  return (
    <div>
      <div className="h-[150px] overflow-auto fixed bottom-[85px] left-9 z-10 ">
        {broadcastMessages &&
          broadcastMessages.map((message, index) => (
            <div key={index} className="bg-red-100">
              {message.senderName}:{message.message}
            </div>
          ))}
      </div>

      <form onSubmit={sentMessage} className="liveStreamMessageInputDiv">
        <input
          type="text"
          placeholder="輸入訊息..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="liveStreamMessageInput"
        />
        <button className="w-[40px] h-[40px] bg-mainPink rounded-full flex justify-center items-center p-3 relative">
          <Image src={sendIcon} alt="send message" />
        </button>
      </form>
    </div>
  );
};

export default Message;
