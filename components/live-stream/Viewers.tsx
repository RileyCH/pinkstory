import Image from "next/image";
import { useHMSStore, selectPeers } from "@100mslive/react-sdk";
import eye from "@/public/live-stream/eye.png";

const Viewers = () => {
  const peers = useHMSStore(selectPeers);

  return (
    <div className="text-[12px] text-white bg-black bg-opacity-40 px-[10px] py-[5px] rounded-lg flex items-center gap-2 fixed left-[56px] top-[18px]">
      <Image src={eye} alt="" width={15} height={15} />
      <p>{peers.length > 1 ? peers.length - 1 : 0} 人</p>
    </div>
  );
};

export default Viewers;
