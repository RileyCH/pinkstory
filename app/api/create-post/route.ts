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

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { postDetails } = await req.json();

    if (!postDetails.uid) {
      return new NextResponse("Without user id", { status: 404 });
    }

    const userCollection = doc(db, "users", `${postDetails.uid}`);
    const postList = collection(userCollection, "posts");
    const newPost = doc(postList); //產生一個新的doc跟ID出來
    await setDoc(newPost, postDetails); //依照上面的docID，set post的內容進去doc裡面

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
