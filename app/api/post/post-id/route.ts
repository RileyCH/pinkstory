import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { getDocs, query, collectionGroup } from "firebase/firestore";
import { db } from "@/utils/database";
import { PostType } from "@/utils/type";

export async function GET(res: NextRequest) {
  const headersInstance = headers();
  const postId = headersInstance.get("Authorization");

  if (!postId) {
    return new NextResponse("No post id", { status: 404 });
  }

  const sanitizedUid = postId.replace("Bearer ", "");
  const postCollection = collectionGroup(db, "posts");
  const q = query(postCollection);
  const querySnapshot = await getDocs(q);

  const post: any = [];
  querySnapshot.forEach((doc) => {
    if (doc.id === sanitizedUid) {
      post.push({ postID: doc.id, data: doc.data() });
    }
  });
  return new NextResponse(JSON.stringify(post));
}
