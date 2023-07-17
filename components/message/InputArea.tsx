"use client";
import { useState } from "react";
import axios from "axios";
const InputArea = ({ roomId, uid }: { roomId: string; uid: string | null }) => {
  const [inputMessage, setInputMessage] = useState<string>("");

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
      className="w-[68vw] flex justify-between px-[15px] py-4 bg-white fixed bottom-0"
    >
      <input
        type="text"
        value={inputMessage}
        placeholder="在此輸入訊息..."
        onChange={(e) => setInputMessage(e.target.value)}
        className="w-[calc(100%_-_100px)] border border-themeGray-200 rounded-full mr-[15px] px-3 py-2 hover:border-themePink-400 placeholder:text-[14px]"
      />
      <button className="bg-themePink-400 hover:bg-themePink-500 text-white px-[20px] py-[5px] rounded-full">
        傳送
      </button>
    </form>
  );
};

export default InputArea;
