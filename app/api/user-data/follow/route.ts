import { NextRequest, NextResponse } from "next/server";
import { getDoc, doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "@/utils/database";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { followingDetail } = await req.json();

    const { uid, followingUid } = followingDetail;
    if (!uid) {
      return new NextResponse("Without user id", { status: 404 });
    }
    if (!followingUid) {
      return new NextResponse("Without following user id", { status: 404 });
    }

    const userDoc = doc(db, "users", `${uid}`);
    const checkUserDoc = await getDoc(userDoc);
    if (!checkUserDoc.exists()) {
      return new NextResponse("User id do not exist", { status: 404 });
    }

    const followingUserDoc = doc(db, "users", `${followingUid}`);
    const checkFollowingUserDoc = await getDoc(followingUserDoc);
    if (!checkFollowingUserDoc.exists()) {
      return new NextResponse("Following user id do not exist", {
        status: 404,
      });
    }

    const formatUserDoc = checkUserDoc.data();
    const formatFollowingUserDoc = checkFollowingUserDoc.data();
    if (formatUserDoc) {
      const followingStatus = formatUserDoc.following.includes(followingUid);
      if (!followingStatus) {
        await updateDoc(userDoc, {
          following: arrayUnion(followingUid),
        });

        await updateDoc(followingUserDoc, {
          follower: arrayUnion(uid),
        });
      } else {
        const filteredFollowingList = formatUserDoc.following.filter(
          (id: string) => id !== followingUid
        );
        const filteredFollowerList = formatFollowingUserDoc.follower.filter(
          (id: string) => id !== uid
        );

        await updateDoc(userDoc, { following: filteredFollowingList });
        await updateDoc(followingUserDoc, { follower: filteredFollowerList });
      }
    }

    return new NextResponse("OK", { status: 200 });
  }
}
