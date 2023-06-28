import { useState, useRef } from "react";
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

const Message = () => {
  const [message, setMessage] = useState<string>("");
  //   const allMessages = useHMSStore(selectHMSMessages); // get all messages
  const broadcastMessages = useHMSStore(selectBroadcastMessages); // get all broadcasted messages
  const groupMessagesByRole = useHMSStore(selectMessagesByRole("host")); // get conversation with the host role
  const peers = useHMSStore(selectPeers);

  const sentMessage = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    hmsActions.sendBroadcastMessage(`${message}`);
    e.target.value = "";
  };

  return (
    <div className="fixed top-10 right-5 bg-white">
      <div>聊天室訊息</div>
      <div>
        {broadcastMessages &&
          broadcastMessages.map((message, index) => (
            <div key={index} className="bg-red-100">
              {message.senderName}:{message.message}
            </div>
          ))}
      </div>

      <form onSubmit={sentMessage}>
        <input
          type="text"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="border border-gray-300"
        />
        <button>傳送</button>
      </form>
    </div>
  );
};

export default Message;
