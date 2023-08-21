import { NextRequest, NextResponse } from "next/server";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  collection,
  setDoc,
} from "firebase/firestore";
import { db } from "@/utils/database";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { messageDetail } = await req.json();

    if (!messageDetail.uid) {
      return new Response("Without uid", { status: 400 });
    }
    if (!messageDetail.receiveUid) {
      return new Response("No received User", { status: 400 });
    }

    const messageCollection = collection(db, "messages");
    const newMessageDoc = doc(messageCollection);
    await setDoc(newMessageDoc, {
      message: [],
      roomId: newMessageDoc.id,
      uid: [messageDetail.uid, messageDetail.receiveUid], //還差一個uid，開啟新對話還不能用！
    }).then(() => {
      return new NextResponse(JSON.stringify(newMessageDoc.id), {
        status: 200,
      });
    });

    // const messageDetails = {
    //   content: messageDetail.content,
    //   sentTime: new Date(),
    //   uid: messageDetail.uid,
    //   // receiveUid: messageDetail.receiveUid,
    // };

    // const messageDoc = doc(db, "messages", messageDetail.roomId);
    // const checkMessageDoc = await getDoc(messageDoc);
    // if (checkMessageDoc.exists()) {
    //   await updateDoc(messageDoc, {
    //     message: arrayUnion(messageDetails),
    //   });
    // }
  }
}
