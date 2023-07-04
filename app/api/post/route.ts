import { NextResponse } from "next/server";
import { getDocs, query, collectionGroup } from "firebase/firestore";
import { db } from "@/utils/database";

export async function GET() {
  const postCollection = collectionGroup(db, "posts");
  const q = query(postCollection);
  const querySnapshot = await getDocs(q);
  const posts: any = [];
  querySnapshot.forEach((doc) => {
    posts.push({
      postID: doc.id,
      data: doc.data(),
    });
  });
  return new NextResponse(JSON.stringify(posts));
}
