import { NextRequest, NextResponse } from "next/server";
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/utils/database";

export async function POST(req: NextRequest) {
  try {
    if (req.method === "POST") {
      const result = await req.json();

      if (result.type === "peer.join.success" && result.data.role === "host") {
        const liveStreamCollection = doc(
          db,
          "liveStream",
          `${result.data.room_id}`
        );
        await setDoc(liveStreamCollection, result);
      }

      if (result.type === "peer.leave.success" && result.data.role === "host") {
        const liveStreamCollection = doc(
          db,
          "liveStream",
          `${result.data.room_id}`
        );
        await deleteDoc(liveStreamCollection);
      }
    }
    return new NextResponse("OK", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 500 });
  }
}
