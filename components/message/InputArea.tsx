"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import EmojiPicker from "emoji-picker-react";
import send from "@/public/live-stream/send.png";
import emojiIcon from "@/public/emoji.png";

const InputArea = ({ roomId, uid }: { roomId: string; uid: string | null }) => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [chosenEmoji, setChosenEmoji] = useState(false);

  const onEmojiClick = (emojiObject: any) => {
    setInputMessage((prev) => `${prev}${emojiObject.emoji}`);
  };

  const submitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage) {
      const messageDetail = {
        content: inputMessage,
        uid: uid,
        sentTime: null,
        roomId: roomId,
      };

      axios
        .post(
          "/api/message/detail",
          { messageDetail },
          { headers: { "Content-Type": "application/json" } }
        )
        .catch((error) => {
          console.error(error);
        });
      setInputMessage("");
    }
  };

  return (
    <form
      onSubmit={submitMessage}
      onKeyDown={(e) => {
        if (e.key === "Enter" && inputMessage) {
          submitMessage;
        }
      }}
      className="w-[68vw] flex justify-between items-center px-[15px] py-4 bg-white fixed bottom-0"
    >
      <input
        type="text"
        value={inputMessage}
        placeholder="在此輸入訊息..."
        onChange={(e) => setInputMessage(e.target.value)}
        className="w-[calc(100%_-_80px)] border border-themeGray-200 rounded-full mr-[15px] px-3 py-2 hover:border-themePink-400 placeholder:text-[14px]"
      />

      <div className="w-[30px] h-[30px] relative mr-4">
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
      <button className="bg-themePink-400 hover:bg-themePink-500 text-white px-[10px] py-[10px] rounded-full">
        <div className="w-[15px] h-[15px] relative">
          <Image src={send} alt="send message button" fill sizes="100%" />
        </div>
      </button>
    </form>
  );
};

export default InputArea;
