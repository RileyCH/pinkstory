import { NextRequest, NextResponse } from "next/server";
import { collection, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/utils/database";
import { CommentType } from "@/utils/type";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { commentDetails } = await req.json();

    if (!commentDetails.postId) {
      return new NextResponse("Without post id", { status: 404 });
    }

    const commentData: CommentType = {
      content: commentDetails.content,
      commentTime: serverTimestamp(),
      loveUser: [],
      uid: commentDetails.uid,
    };
    const commentCollection = collection(
      db,
      "users",
      `${commentDetails.authorId}`,
      "posts",
      `${commentDetails.postId}`,
      "comments"
    );

    const newComment = doc(commentCollection);
    await setDoc(newComment, commentData); //依照上面的docID，set post的內容進去doc裡面
    return new NextResponse("OK", { status: 200 });
  }
}
