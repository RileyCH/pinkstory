import { headers } from "next/headers";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Comments from "@/components/post/Comments";
import AddComment from "@/components/post/AddComment";
import back from "@/public/back.png";
import share from "@/public/post/share.png";
import heart from "@/public/post/heart.png";
import keep from "@/public/post/keep.png";
import message from "@/public/post/message.png";

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
      <div className="w-[100vw] h-[50px] pt-[15px] px-[15px] mb-2 flex justify-between items-center fixed top-0 left-0 bg-white z-30">
        <Link href={`/main/${post.postData.data.uid}`}>
          <Image src={back} alt="back to main page" width={25} height={25} />
        </Link>
        <div>
          <Link href={`/main`} className="relative">
            <Image src={share} alt="back to main page" width={25} height={25} />
          </Link>
        </div>
      </div>

      <div className="mt-[100px]">
        <div>
          <Link href={`/main/${post.postData.data.uid}`} className="flex gap-2">
            <Image
              src={`${post.postUser.profileImg}`}
              alt="back to main page"
              width={25}
              height={25}
            />
            <div>{post.postUser.name}</div>
          </Link>
        </div>
        <div>{post.postData.data.category}</div>
        <div>
          {new Date(
            post.postData.data.createTime.seconds * 1000
          ).toLocaleString()}
        </div>
        <div>
          {post.postData.data.address.city} / {post.postData.data.address.area}
        </div>
        <div className="w-[100vw] mx-auto flex overflow-x-auto">
          {post.postData.data.picture.length > 0 &&
            post.postData.data.picture.map((pic: string) => (
              <div
                key={pic}
                className={`w-[400px] h-[400px] relative flex-none`}
              >
                <Image src={pic} alt="" fill />
              </div>
            ))}
        </div>
      </div>
      <h2 className="">{post.postData.data.title}</h2>
      <p>
        {postContent.map((Content: string, index: number) => (
          <p key={index}>
            {Content}
            <br />
          </p>
        ))}
      </p>
      <div className="flex gap-3">
        <div className="flex gap-1">
          <Image src={heart} alt="" width={20} height={20} />
          <p>0</p>
        </div>
        <div className="flex gap-1">
          <Image src={keep} alt="" width={20} height={20} />
          <p>0</p>
        </div>
        <div className="flex gap-1">
          <Image src={message} alt="" width={20} height={20} />
          <p>0</p>
        </div>
      </div>
      <Comments postId={params.postid} authorId={post.postData.data.uid} />
      <AddComment postId={params.postid} authorId={post.postData.data.uid} />
    </div>
  );
};

export default PostID;
