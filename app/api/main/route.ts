import { NextRequest, NextResponse } from "next/server";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "@/utils/database";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { user } = await req.json();

    if (!user.uid) {
      return new NextResponse("Without user id", { status: 404 });
    }

    const userCollection = doc(db, "users", `${user.uid}`);
    await setDoc(userCollection, user); //依照上面的docID，set post的內容進去doc裡面

    return new NextResponse("OK", { status: 200 });
  }
}
