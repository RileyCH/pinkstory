"use client";
import { useState } from "react";
import axios from "axios";

const InputArea = ({ roomId, uid }: { roomId: string; uid: string }) => {
  const [inputMessage, setInputMessage] = useState<string>("");

  const submitMessage = (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  return (
    <div className="w-[100vw] fixed bottom-0 p-[10px] bg-white">
      <form
        onSubmit={submitMessage}
        onKeyDown={(e) => {
          if (e.key === "Enter" && inputMessage) {
            submitMessage;
          }
        }}
        className="flex justify-between px-[20px]"
      >
        <input
          type="text"
          onChange={(e) => setInputMessage(e.target.value)}
          className="w-[70vw] border border-spacing-2 mr-[15px]"
        />
        <button className="bg-[#FB6E6E] text-white px-[12px] py-[5px] rounded-lg">
          傳送
        </button>
      </form>
    </div>
  );
};

export default InputArea;
