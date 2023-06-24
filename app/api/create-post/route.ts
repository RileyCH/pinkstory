import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  setDoc,
  doc,
  getDocs,
  serverTimestamp,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/utils/database";

type post = {
  category: string;
  content: string;
  //   createTime: number;
  hashtag: string[];
  //   location: GeolocationPosition;
  picture: string[] | null;
  status: string;
  title: string;
  video: string | null;
};

export async function POST(req: NextRequest) {
  if (req) {
    const post: post = {
      category: "makeup",
      content: "今天心情好",
      //   createTime: serverTimestamp(),
      hashtag: ["#tag", "metoo"],
      //   location: 25.0384696,
      picture: [
        "https://fakeimg.pl/300x200/200",
        "https://fakeimg.pl/300x200/200",
      ],
      status: "published",
      title: "文章標題",
      video: null,
    };

    const userCollection = doc(db, "users", "bntWcXZUSKQ46EeJtei73g3pijs1");
    const postList = collection(userCollection, "posts");
    const newPost = doc(postList); //產生一個新的doc跟ID出來
    const addPost = await setDoc(newPost, post); //依照上面的docID，set post的內容進去doc裡面
    return new NextResponse("OK", { status: 200 });
  }
}

//回傳JSON格式的方法
//   if (req) {
//     const { uid } = await req.json();
//     const data = { message: "Hello, world!" };
//     const userCollection = query(collection(db, "users"));
//     return new Response(JSON.stringify(data), { status: 200 });
//   }
