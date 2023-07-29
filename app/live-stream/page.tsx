import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import HostButton from "@/components/live-stream/HostButton";
import PostSkeleton from "@/components/skeleton/PostSkeleton";

const Rooms = dynamic(() => import("@/components/live-stream/Rooms"), {
  loading: () => <PostSkeleton />,
});

const LiveStream = () => {
  return (
    <div>
      <Header />

      <div className="pt-[60px] pb-[75px] md:pt-[85px]">
        <HostButton />
        <Rooms />
      </div>

      <Nav />
    </div>
  );
};

export default LiveStream;
