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

    // if (!messageDetail.roomId) {
    //   return new Response("Without roomId", { status: 400 });
    // }
    if (!messageDetail.roomId) {
      const messageCollection = collection(db, "messages");
      const newMessageDoc = doc(messageCollection);
      await setDoc(newMessageDoc, {
        // message: [messageDetails],
        roomId: newMessageDoc.id,
        uid: [messageDetail.uid, messageDetail.receiveUid], //還差一個uid，開啟新對話還不能用！
      }).then(()=>{
        return new NextResponse(JSON.stringify(newMessageDoc.id), { status: 200 });
      });
    }

    if (!messageDetail.uid) {
      return new Response("Without uid", { status: 400 });
    }
    if (!messageDetail.content) {
      return new Response("No message content", { status: 400 });
    }

    const messageDetails = {
      content: messageDetail.content,
      sentTime: new Date(),
      uid: messageDetail.uid,
      // receiveUid: messageDetail.receiveUid,
    };

    const messageDoc = doc(db, "messages", messageDetail.roomId);
    const checkMessageDoc = await getDoc(messageDoc);
    if (checkMessageDoc.exists()) {
      await updateDoc(messageDoc, {
        message: arrayUnion(messageDetails),
      });
    }

    // if (!checkMessageDoc.exists()) {
    //   const messageCollection = collection(db, "messages");
    //   const newMessageDoc = doc(messageCollection);
    //   await setDoc(newMessageDoc, {
    //     message: [messageDetails],
    //     roomId: newMessageDoc.id,
    //     uid: [messageDetail.uid], //還差一個uid，開啟新對話還不能用！
    //   });
    // } else {
    //   await updateDoc(messageDoc, {
    //     message: arrayUnion(messageDetails),
    //   });
    // }

    return new NextResponse("OK", { status: 200 });
  }
}
