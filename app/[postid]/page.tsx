import { headers } from "next/headers";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import BackDiv from "@/components/BackDiv";
import FollowBtn from "@/components/post/FollowBtn";
import KeepAndLove from "@/components/post/KeepAndLove";
import Comments from "@/components/post/Comments";
import AddComment from "@/components/post/AddComment";

async function getPost(postid: string) {
  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto");
  const host = headersData.get("host");
  const postData = await axios
    .get(`${protocol}://${host}/api/post/post-id`, {
      headers: { Authorization: `Bearer ${postid}` },
    })
    .then((res) => res.data);
  const postUser = await axios
    .get(`${protocol}://${host}/api/user-data`, {
      headers: { Authorization: `Bearer ${postData[0].data.uid}` },
    })
    .then((res) => res.data);

  const result = {
    postUser: postUser,
    postData: postData[0],
  };

  return result;
}

const PostID = async ({ params }: { params: { postid: string } }) => {
  const post = await getPost(params.postid);
  const postContent = post.postData.data.content.split("\n");

  return (
    <div className="pb-[100px]">
      <div className="w-[100vw] h-[55px] pt-[15px] pb-[20px] px-[15px] flex justify-between items-center fixed top-0 left-0 bg-white z-30 drop-shadow-sm">
        <BackDiv url={"post"} />
      </div>

      <div className="w-[calc(100vw_-_70px)] flex gap-2 items-center justify-between fixed top-[14px] right-[16px] z-30">
        <Link
          href={`/main/${post.postData.data.uid}`}
          className="flex items-center gap-4"
        >
          <div className="w-[30px] h-[30px] relative">
            <Image
              src={`${post.postUser.profileImg}`}
              alt="back to main page"
              fill
              className="rounded-full object-cover"
              priority={true}
              sizes="(max-width: 768px) 30px, 50px"
            />
          </div>

          <div className="font-medium">{post.postUser.name}</div>
        </Link>
        <FollowBtn postUid={post.postData.data.uid} />
      </div>
      <div className="w-[100vw] mx-auto mt-[50px] flex overflow-x-auto">
        {post.postData.data.picture.length > 0 &&
          post.postData.data.picture.map((pic: string) => (
            <div key={pic} className={`w-[400px] h-[400px] relative flex-none`}>
              <Image src={pic} alt="" fill priority={true} sizes="500px" />
            </div>
          ))}
      </div>

      <div className="w-[95vw] mx-auto mt-[10px] px-2">
        <p className="text-[12px] text-themePink-400 font-medium mb-1">
          {post.postData.data.category.toUpperCase()}
        </p>
        <p className="font-semibold mb-2">{post.postData.data.title}</p>
        <div className="mb-[20px]">
          {postContent.map((Content: string, index: number) => (
            <p key={index} className="text-[14px]">
              {Content}
              <br />
            </p>
          ))}
        </div>

        <div className="flex gap-4 mb-[20px]">
          <p className="text-[12px] text-themeGray-600">
            {new Date(
              post.postData.data.createTime.seconds * 1000
            ).toLocaleString()}
          </p>
          <p className="text-[12px] text-themeGray-600">
            {post.postData.data.address.city}
            {post.postData.data.address.area &&
              `・${post.postData.data.address.area}`}
          </p>
        </div>

        <KeepAndLove postId={params.postid} authorId={post.postData.data.uid} />
        <Comments postId={params.postid} authorId={post.postData.data.uid} />
      </div>

      <AddComment postId={params.postid} authorId={post.postData.data.uid} />
    </div>
  );
};

export default PostID;
