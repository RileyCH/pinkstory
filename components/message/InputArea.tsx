"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import EmojiPicker from "emoji-picker-react";
import LoadingAnimation from "@/components/LoadingAnimation";
import send from "@/public/live-stream/send.png";
import emojiIcon from "@/public/emoji.png";

const InputArea = ({ roomId, uid }: { roomId: string; uid: string | null }) => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [chosenEmoji, setChosenEmoji] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onEmojiClick = (emojiObject: any) => {
    setInputMessage((prev) => `${prev}${emojiObject.emoji}`);
  };

  const submitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage !== "") {
      setLoading(true);
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
          })
          .finally(() => {
            setLoading(false);
          });
        setInputMessage("");
      }
    } else {
      window.alert("請先輸入訊息");
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
      className="w-[100%] md:w-[68vw] flex justify-between items-center px-[15px] py-4 bg-white fixed bottom-0"
    >
      <textarea
        rows={1}
        cols={40}
        value={inputMessage}
        placeholder="在此輸入訊息..."
        onChange={(e) => setInputMessage(e.target.value)}
        className="w-[calc(100%_-_80px)] border border-themeGray-200 rounded-full mr-[15px] px-3 py-2 resize-none hover:border-themePink-400 placeholder:text-[14px]"
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
        {loading ? (
          <LoadingAnimation />
        ) : (
          <div className="w-[15px] h-[15px] relative">
            <Image src={send} alt="send message button" fill sizes="100%" />
          </div>
        )}
      </button>
    </form>
  );
};

export default InputArea;
