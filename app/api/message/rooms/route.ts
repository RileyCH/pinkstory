import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/utils/database";

export async function GET() {
  const headersInstance = headers();
  const uid = headersInstance.get("Authorization");

  if (!uid) {
    return new Response("Uid is wrong", { status: 400 });
  }

  const sanitizedUid = uid.replace("Bearer ", "");
  const messageCollection = collection(db, "messages");
  const q = query(
    messageCollection,
    where("uid", "array-contains", sanitizedUid)
  );
  const messageDoc = await getDocs(q);

  if (!messageDoc) {
    return new NextResponse("No posts", { status: 404 });
  }

  const messageList: any = [];
  messageDoc.forEach((doc) => {
    messageList.push({
      chatRoomId: doc.id,
      data: doc.data(),
    });
  });
  return new NextResponse(JSON.stringify(messageList));
}
