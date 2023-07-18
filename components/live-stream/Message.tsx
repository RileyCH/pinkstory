import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  useHMSStore,
  selectBroadcastMessages,
  selectPeers,
} from "@100mslive/react-sdk";
import { hmsActions } from "@/utils/hms";
import EmojiPicker from "emoji-picker-react";
import sendIcon from "@/public/live-stream/send.png";
import profile from "@/public/main/profile.png";
import emojiIcon from "@/public/emoji.png";

const Message = () => {
  const [message, setMessage] = useState<string>("");
  const [chosenEmoji, setChosenEmoji] = useState(false);
  const broadcastMessages = useHMSStore(selectBroadcastMessages);
  const peers = useHMSStore(selectPeers);
  const messageCollection = useRef<null | HTMLDivElement>(null);

  const sentMessage = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    hmsActions.sendBroadcastMessage(`${message}`);
    setMessage("");
  };
  const onEmojiClick = (emojiObject: any) => {
    setMessage((prev) => `${prev}${emojiObject.emoji}`);
  };

  const peersProfile = peers.map((peer) => {
    if (peer && peer.metadata) {
      return {
        id: peer.id,
        metadata: JSON.parse(peer.metadata),
      };
    }
  });

  useEffect(() => {
    if (messageCollection && messageCollection.current) {
      messageCollection.current.scrollTop =
        messageCollection.current.scrollHeight;
    }
  }, [broadcastMessages, messageCollection]);

  return (
    <div>
      <div
        ref={messageCollection}
        className="h-[200px] overflow-auto fixed bottom-[90px] left-9 z-10 md:h-[350px]"
      >
        {broadcastMessages &&
          broadcastMessages.map((message, index) => (
            <div
              key={index}
              className="bg-black bg-opacity-40 py-[7px] pl-[12px] pr-[20px] rounded-full mb-[5px] inline-block  mr-[calc(100vw_-_300px)] md:inline-block"
            >
              <div className="flex gap-3">
                <div className="w-[30px] h-[30px] relative md:w-[40px] md:h-[40px]">
                  <Image
                    src={
                      peersProfile?.filter(
                        (peer: any) => peer.id === message.sender
                      )[0]?.metadata?.profile
                        ? `${
                            peersProfile?.filter(
                              (peer: any) => peer.id === message.sender
                            )[0]?.metadata?.profile
                          }`
                        : profile
                    }
                    alt=""
                    fill
                    className="rounded-full"
                  />
                </div>

                <div className="max-w-[180px] md:max-w-[300px] lg:max-w-[450px] flex flex-col">
                  <p className="text-[14px] font-medium text-themePink-200 md:text-[18px]">
                    {message?.senderName}
                  </p>
                  <p className="text-[12px] break-words md:text-[16px] text-white inline-block">
                    {message?.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>

      <form onSubmit={sentMessage} className="liveStreamMessageInputDiv">
        <input
          type="text"
          value={message}
          placeholder="輸入訊息..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="liveStreamMessageInput"
        />
        <div className="w-[40px] h-[40px] relative mx-4">
          <Image
            src={emojiIcon}
            alt="emoji icon"
            fill
            sizes="100%"
            className="cursor-pointer hover:drop-shadow-xl"
            onClick={() => setChosenEmoji((prev) => !prev)}
          />
          {chosenEmoji && (
            <div
              className="absolute bottom-12 right-0"
              onMouseLeave={() => setChosenEmoji((prev) => !prev)}
            >
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
        <button className="w-[40px] h-[40px] bg-themePink-400 rounded-full flex justify-center items-center p-3 relative">
          <Image src={sendIcon} alt="send message" />
        </button>
      </form>
    </div>
  );
};

export default Message;
