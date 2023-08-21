import { useState } from "react";
import Image from "next/image";
import LoadingAnimation from "@/components/LoadingAnimation";
import send from "@/public/live-stream/send.png";

const NewMessage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="w-[300px] min-h-[150px] bg-white fixed right-0 left-0 mx-auto border border-themePink-500 z-30">
      <p>開啟新的聊天</p>

      <form className="w-[100%] flex gap-2 absolute bottom-0 border border-themePink-500">
        <textarea
          cols={2}
          // type="text"
          placeholder="在此輸入訊息..."
          className="w-[calc(100%_-_80px)] border border-themeGray-200 rounded resize-none mr-[15px] px-3 py-2 hover:border-themePink-400 placeholder:text-[14px]"
        />
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
    </div>
  );
};

export default NewMessage;
