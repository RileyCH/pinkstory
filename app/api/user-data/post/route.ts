import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { collection, doc, getDocs, query } from "firebase/firestore";
import { db } from "@/utils/database";

export async function GET() {
  const headersInstance = headers();
  const uid = headersInstance.get("Authorization");

  if (!uid) {
    return new Response("Uid is wrong", { status: 400 });
  }

  const sanitizedUid = uid.replace("Bearer ", "");
  const userCollection = doc(db, "users", sanitizedUid);
  const postList = collection(userCollection, "posts");
  const q = query(postList);
  const postDoc = await getDocs(q);

  if (!postDoc) {
    return new NextResponse("No posts", { status: 404 });
  }

  const posts: any = [];
  postDoc.forEach((doc) => {
    posts.push({
      postID: doc.id,
      data: doc.data(),
    });
  });
  return new NextResponse(JSON.stringify(posts));
}
