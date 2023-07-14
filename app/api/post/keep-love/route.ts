import { NextRequest, NextResponse } from "next/server";
import { getDoc, doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "@/utils/database";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { keepLoveDetail } = await req.json();

    const { uid, authorUid, postId, action } = keepLoveDetail;
    if (!uid) {
      return new NextResponse("Without user id", { status: 404 });
    }
    if (!authorUid) {
      return new NextResponse("Without post author id", { status: 404 });
    }
    if (!postId) {
      return new NextResponse("Without post id", { status: 404 });
    }
    if (!action) {
      return new NextResponse("Action is not defined", { status: 404 });
    }

    const postDoc = doc(db, `users/${authorUid}/posts/${postId}`);
    const checkPostDoc = await getDoc(postDoc);
    if (!checkPostDoc.exists()) {
      return new NextResponse("Post is not existing", { status: 404 });
    }

    const formatPostDoc = checkPostDoc.data();

    if (formatPostDoc) {
      if (action === "keep") {
        const postKeepStatus = formatPostDoc.keepUser.includes(uid);
        if (!postKeepStatus) {
          await updateDoc(postDoc, {
            keepUser: arrayUnion(uid),
          });
        } else {
          const filteredKeepUserList = formatPostDoc.keepUser.filter(
            (id: string) => id !== uid
          );
          await updateDoc(postDoc, { keepUser: filteredKeepUserList });
        }
      } else if (action === "love") {
        const postLoveStatus = formatPostDoc.loveUser.includes(uid);
        if (!postLoveStatus) {
          await updateDoc(postDoc, {
            loveUser: arrayUnion(uid),
          });
        } else {
          const filteredLoveUserList = formatPostDoc.loveUser.filter(
            (id: string) => id !== uid
          );
          await updateDoc(postDoc, { loveUser: filteredLoveUserList });
        }
      }
    }

    return new NextResponse("OK", { status: 200 });
  }
}
