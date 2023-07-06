import { collectionGroup, getDocs } from "firebase/firestore";
import { db } from "@/utils/database";
import Post from "@/components/main/Post";
import Nav from "@/components/Nav";
import { PostType } from "@/utils/type";

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
      <p className="text-center text-[24px] my-[20px]">文章列表</p>
      <Post posts={postList} />
      <Nav />
      <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD9rPlvAdkzmyTmkt6YSmp-LJYn4_RGq30&libraries=geometry"
        async
        defer
      ></script>
    </main>
  );
}
