import dynamic from "next/dynamic";
import BackDiv from "@/components/BackDiv";
import PostDetailSkeleton from "@/components/skeleton/PostDetailSkeleton";

const PostContent = dynamic(() => import("@/components/post/PostContent"), {
  loading: () => <PostDetailSkeleton />,
});

const PostID = async ({ params }: { params: { postid: string } }) => {
  return (
    <div className="pb-[70px] md:pb-[20px]">
      <div className="w-[100vw] h-[55px] pt-[15px] pb-[20px] px-[15px] flex justify-between items-center fixed top-0 left-0 bg-white z-30 drop-shadow-sm">
        <BackDiv url={"post"} />
      </div>
      <PostContent postid={params.postid} />
    </div>
  );
};

export default PostID;
