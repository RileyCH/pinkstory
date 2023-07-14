import { NextRequest, NextResponse } from "next/server";
import { getDoc, doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "@/utils/database";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { loveComment } = await req.json();

    const { uid, authorUid, postId, commentId } = loveComment;
    if (!uid) {
      return new NextResponse("Without user id", { status: 404 });
    }
    if (!authorUid) {
      return new NextResponse("Without post author id", { status: 404 });
    }
    if (!postId) {
      return new NextResponse("Without post id", { status: 404 });
    }
    if (!commentId) {
      return new NextResponse("Without comment id", { status: 404 });
    }

    const commentDoc = doc(
      db,
      `users/${authorUid}/posts/${postId}/comments/${commentId}`
    );
    const checkCommentDoc = await getDoc(commentDoc);
    if (!checkCommentDoc.exists()) {
      return new NextResponse("Comment is not existing", { status: 404 });
    }

    const formatCommentDoc = checkCommentDoc.data();

    if (formatCommentDoc) {
      const postLoveStatus = formatCommentDoc.loveUser.includes(uid);
      if (!postLoveStatus) {
        await updateDoc(commentDoc, {
          loveUser: arrayUnion(uid),
        });
      } else {
        const filteredLoveUserList = formatCommentDoc.loveUser.filter(
          (id: string) => id !== uid
        );
        await updateDoc(commentDoc, { loveUser: filteredLoveUserList });
      }
    }

    return new NextResponse("OK", { status: 200 });
  }
}
