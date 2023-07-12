import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Rooms from "@/components/live-stream/Rooms";
import HostButton from "@/components/live-stream/HostButton";
import pinkStory from "@/public/pinkStory-p.png";

const LiveStream = () => {
  return (
    <div>
      <Header />
      {/* <div className="w-[100vw] py-[5px] mb-3 bg-gradient-to-tl from-[#fae8e6] from-10% via-[#F9D1BA] via-30% to-[#f9b6b0] to-80% drop-shadow-xl fixed z-30 md:z-0">
        <div className="w-[90px] h-[35px] relative mx-auto mt-5 mb-1 md:hidden">
          <Image src={pinkStory} alt="logo" />
        </div>
      </div> */}
      <div className="pt-[60px] pb-[75px] md:pt-[85px]">
        <HostButton />
        <Rooms />
      </div>

      <Nav />
    </div>
  );
};

export default LiveStream;
