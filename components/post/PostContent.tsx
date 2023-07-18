import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
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

const PostContent = async ({ postid }: { postid: string }) => {
  const post = await getPost(postid);
  const postContent = post.postData.data.content.split("\n");

  return (
    <div className="md:w-[80vw] md:mt-[80px] md:flex md:justify-center md:gap-5 md:mx-auto xl:mt-[95px] md:bg-white md:rounded-lg md:shadow-[20px_25px_10px_-20px_rgba(0,0,0,0.1)] md:h-[80vh] md:relative">
      <div className="w-[100vw] mx-auto mt-[50px] flex overflow-x-auto md:w-[450px] md:h-[80vh] md:mt-0 md:mx-0 xl:w-[550px] xl:gap-7">
        {post.postData.data.picture.length > 0 &&
          post.postData.data.picture.map((pic: string) => (
            <div
              key={pic}
              className={`w-[400px] h-[400px] relative flex-none md:w-[100%] md:h-[100%]`}
            >
              <Image
                src={pic}
                alt="post pictures"
                fill
                priority={true}
                sizes="100%"
                className="object-cover md:rounded-l-xl"
              />
            </div>
          ))}
      </div>
      <div className="md:w-[calc(80vw_-_500px)] xl:md:w-[calc(80vw_-_600px)] md:relative">
        <div className="w-[calc(100vw_-_70px)] flex gap-2 items-center justify-between fixed top-[14px] right-[16px] z-30 md:absolute md:w-[calc(100%)] md:py-1 md:px-3 md:top-[5px] md:left-0 md:bg-white">
          <Link
            href={`/main/${post.postData.data.uid}`}
            className="flex items-center gap-4"
          >
            <div className="w-[30px] h-[30px] relative md:w-[35px] md:h-[35px] xl:w-[45px] xl:h-[45px]">
              <Image
                src={`${post.postUser.profileImg}`}
                alt="back to main page"
                fill
                className="rounded-full object-cover"
                priority={true}
                sizes="(max-width: 768px) 30px, 50px"
              />
            </div>

            <div className="font-medium xl:text-[18px]">
              {post.postUser.name}
            </div>
          </Link>
          <FollowBtn postUid={post.postData.data.uid} />
        </div>

        <div className="w-[95vw] mx-auto mt-[10px] px-2 md:w-[100%] md:mt-[70px] md:max-h-[calc(80vh_-_130px)] md:overflow-auto md:no-scrollbar">
          <p className="text-[12px] text-themePink-400 font-medium mb-1 md:text-[14px]">
            {post.postData.data.category.toUpperCase()}
          </p>
          <p className="font-semibold mb-2 md:text-[18px] md:mb-4">
            {post.postData.data.title}
          </p>
          <div className="mb-[20px]">
            {postContent.map((Content: string, index: number) => (
              <p key={index} className="text-[14px] md:text-[16px]">
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

          <KeepAndLove postId={postid} authorId={post.postData.data.uid} />
          <Comments postId={postid} authorId={post.postData.data.uid} />
        </div>

        <AddComment postId={postid} authorId={post.postData.data.uid} />
      </div>
    </div>
  );
};

export default PostContent;
