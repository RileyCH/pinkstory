import Image from "next/image";
import dynamic from "next/dynamic";
import { collectionGroup, getDocs } from "firebase/firestore";
import { db } from "@/utils/database";
import SearchBar from "@/components/post/SearchBar";
import Nav from "@/components/Nav";
import PostSkeleton from "@/components/skeleton/PostSkeleton";
import { PostType } from "@/utils/type";
import pinkStory from "@/public/pinkStory-p.png";

const PostCard = dynamic(() => import("@/components/post/PostCard"), {
  loading: () => <PostSkeleton />,
});

async function fetchPosts() {
  const postCollection = collectionGroup(db, "posts");
  const querySnapshot = await getDocs(postCollection);
  const posts: PostType[] = [];
  querySnapshot.forEach((doc) => {
    posts.push({
      postID: doc.id,
      data: {
        tagUer: doc.data().tagUer,
        title: doc.data().title,
        authority: doc.data().authority,
        address: {
          area: doc.data().address.area,
          city: doc.data().address.city,
        },
        picture: doc.data().picture,
        uid: doc.data().uid,
        location: {
          lon: doc.data().location.lon,
          lat: doc.data().location.lat,
        },
        category: doc.data().category,
        content: doc.data().content,
        status: doc.data().status,
        loveUser: doc.data().loveUser,
        createTime: doc.data().createTime,
        keepUser: doc.data().keepUser,
      },
    });
  });
  return posts;
}
export const revalidate = 0;

export default async function Home() {
  const postList = await fetchPosts();

  return (
    <main>
      <div className="w-[100vw] py-[5px] mb-3 bg-gradient-to-tl from-[#fae8e6] from-10% via-[#F9D1BA] via-30% to-[#f9b6b0] to-80% drop-shadow-sm fixed z-30 md:z-0">
        <div className="w-[90px] h-[35px] relative mx-auto my-1 md:hidden">
          <Image src={pinkStory} alt="logo" fill sizes="100%" />
        </div>
        <SearchBar />
      </div>

      <div className="pt-[60px] pb-[75px] md:pt-[85px]">
        <PostCard posts={postList} />
      </div>

      <Nav />
    </main>
  );
}
