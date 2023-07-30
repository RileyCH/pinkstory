import { NextRequest, NextResponse } from "next/server";
import { collection, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/utils/database";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { user } = await req.json();
    if (!user) {
      return new NextResponse("Without user data", { status: 404 });
    }

    const userData = {
      uid: user.uid,
      name: user.name,
      birth: {
        date: user.birth.date,
        month: user.birth.month,
        year: user.birth.year,
      },
      constellations: user.constellations,
      gender: user.gender,
      liveStream: {
        roomId: user.liveStream.roomId,
        hostRoomCode: user.liveStream.hostRoomCode,
        guestRoomCode: user.liveStream.guestRoomCode,
      },
      registedDate: serverTimestamp(),
      following: [],
      follower: [],
      introduction: user.introduction,
      bgImg: "",
      profileImg: "",
    };

    const userCollection = collection(db, "users");
    const newUser = doc(userCollection, user.uid);
    await setDoc(newUser, userData);

    return new NextResponse("OK", { status: 200 });
  }
}
